export default function RadioInput({ title, values, checked, onChange, unit }) {
    return (
        <div className="flex gap-4 ">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <div className="flex gap-2">
                {values.map(val => (
                    <div key={val} className="flex items-center gap-2">
                        <input
                            className="bg-gray-200 text-sm rounded-xl px-2 py-1"
                            type="radio" name={title} value={val} checked={checked == val}
                            onChange={onChange}
                        />
                        <h1>{val}{unit}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}