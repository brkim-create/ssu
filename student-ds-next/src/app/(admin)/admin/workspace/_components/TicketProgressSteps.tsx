"use client";

import {
  STATUS_RECEIVED,
  STATUS_PROCESSING,
  STATUS_COMPLETED,
} from "../constants";

interface TicketProgressStepsProps {
  status: string;
}

export default function TicketProgressSteps({ status }: TicketProgressStepsProps) {
  const steps = [
    { label: "접수", completed: true },
    {
      label: "배정",
      completed: status !== STATUS_RECEIVED,
    },
    {
      label: "처리",
      completed: status === STATUS_PROCESSING || status === STATUS_COMPLETED,
      active: status === STATUS_PROCESSING,
    },
    {
      label: "완료",
      completed: status === STATUS_COMPLETED,
    },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
      <div className="flex items-center text-xs">
        {steps.map((step, idx) => (
          <div key={step.label} className="contents">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                  step.completed
                    ? "bg-green-500"
                    : step.active
                    ? "bg-orange-500"
                    : "bg-gray-300"
                }`}
              >
                {step.completed ? "✓" : idx + 1}
              </div>
              <span className="mt-1 text-[10px]">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 ${
                  steps[idx + 1].completed || steps[idx + 1].active
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
