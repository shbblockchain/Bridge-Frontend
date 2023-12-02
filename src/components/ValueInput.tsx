import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type Props = {
  value?: number | string;
  setValue?: (value: number | string) => void;
  balance?: string | number;
  description?: string;
  invalid?: boolean;
  invalidMessage?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function ValueInput({
  value,
  setValue,
  balance,
  description,
  className,
  invalid,
  invalidMessage,
  ...props
}: Props) {
  return (
    <div className={cn("relative flex flex-col", className)}>
      <div className="relative mb-2">
        <Input
          className={cn("pr-16", {
            "text-red-500 ring-1 !ring-red-500": invalid,
          })}
          type="number"
          value={value}
          onChange={(e) => setValue?.(e.target.value)}
          {...props}
        />
        {!props.readOnly && (
          <button
            className="absolute px-2 py-1 text-xs font-bold transition-all -translate-y-1/2 bg-white rounded-lg shadow right-4 top-1/2 hover:bg-white/80"
            onClick={() => balance !== undefined && setValue?.(balance)}
          >
            MAX
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!props.readOnly && balance !== undefined && (
          <p className="text-xs ">
            Balance: {Number(balance).toLocaleString()}
          </p>
        )}
        {description !== undefined && <p className="text-xs ">{description}</p>}
        {invalid && invalidMessage && (
          <p className="ml-auto text-xs font-bold text-red-500">
            {invalidMessage}
          </p>
        )}
      </div>
    </div>
  );
}
