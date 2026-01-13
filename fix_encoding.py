import os
import re

# 대상 확장자
TARGET_EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css', '.html', '.txt', '.mjs'}

# 제외할 디렉토리
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', 'build', '.next', '__pycache__'}

# 한글 패턴 (유니코드 한글 범위)
KOREAN_PATTERN = re.compile(r'[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]')

def has_korean(text):
    """텍스트에 한글이 포함되어 있는지 확인"""
    return bool(KOREAN_PATTERN.search(text))

def try_decode(file_path):
    """파일을 여러 인코딩으로 시도하여 디코딩"""
    # 1순위: cp949 (Windows 한글)
    try:
        with open(file_path, 'rb') as f:
            raw_bytes = f.read()

        # cp949로 디코딩 시도
        try:
            content_cp949 = raw_bytes.decode('cp949')
            if has_korean(content_cp949):
                return content_cp949, 'cp949'
        except (UnicodeDecodeError, UnicodeError):
            pass

        # utf-8로 디코딩 시도
        try:
            content_utf8 = raw_bytes.decode('utf-8')
            return content_utf8, 'utf-8'
        except (UnicodeDecodeError, UnicodeError):
            pass

        # euc-kr로 디코딩 시도
        try:
            content_euckr = raw_bytes.decode('euc-kr')
            if has_korean(content_euckr):
                return content_euckr, 'euc-kr'
        except (UnicodeDecodeError, UnicodeError):
            pass

        return None, None
    except Exception as e:
        print(f"  [ERROR] 파일 읽기 실패: {e}")
        return None, None

def convert_file(file_path):
    """파일을 UTF-8로 변환"""
    content, detected_encoding = try_decode(file_path)

    if content is None:
        return False, "디코딩 실패"

    if detected_encoding == 'utf-8':
        return False, "이미 UTF-8"

    # cp949 또는 euc-kr로 감지된 경우 UTF-8로 변환
    try:
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        return True, f"{detected_encoding} -> UTF-8 변환 완료"
    except Exception as e:
        return False, f"저장 실패: {e}"

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"작업 디렉토리: {base_dir}")
    print(f"대상 확장자: {TARGET_EXTENSIONS}")
    print(f"제외 디렉토리: {EXCLUDE_DIRS}")
    print("-" * 60)

    converted_count = 0
    skipped_count = 0
    error_count = 0

    for root, dirs, files in os.walk(base_dir):
        # 제외할 디렉토리 필터링
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

        for file in files:
            # 확장자 확인
            ext = os.path.splitext(file)[1].lower()
            if ext not in TARGET_EXTENSIONS:
                continue

            file_path = os.path.join(root, file)
            relative_path = os.path.relpath(file_path, base_dir)

            success, message = convert_file(file_path)

            if success:
                print(f"[CONVERTED] {relative_path}")
                print(f"            {message}")
                converted_count += 1
            elif "이미 UTF-8" in message:
                skipped_count += 1
            else:
                print(f"[SKIPPED]   {relative_path} - {message}")
                error_count += 1

    print("-" * 60)
    print(f"변환 완료: {converted_count}개 파일")
    print(f"건너뜀 (이미 UTF-8): {skipped_count}개 파일")
    print(f"오류: {error_count}개 파일")

if __name__ == "__main__":
    main()
