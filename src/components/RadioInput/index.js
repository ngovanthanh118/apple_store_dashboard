export default function RadioInput({ title, values, checked, onChange }) {
    return (
        <div className="flex gap-4 ">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <div className="flex gap-2">
                {values.map(val => (
                    <div className="flex items-center gap-2">
                        <input
                            className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                            type="radio" name={title} value={val} checked={checked === val}
                            onChange={onChange}
                        />
                        <h1>{val}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}