export default function TextInput({ title, value, type = "text", onChange, disabled = false }) {
    return (
        <div className="flex gap-4">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <input
                className={disabled ? "opacity-80 px-2 py-1 w-1/4" : "bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}