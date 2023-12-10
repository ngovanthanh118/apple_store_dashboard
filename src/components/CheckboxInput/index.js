export default function CheckboxInput({ title, checked, onChange }) {
    return (
        <div className="flex gap-4">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <input
                className="bg-gray-200 text-sm rounded-xl px-2 py-1"
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
        </div>
    )
}