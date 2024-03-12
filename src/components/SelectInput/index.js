export default function SelectInput({ title, options, onChange, selected = options[0]._id }) {
    return (
        <div className="flex gap-4 ">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <select onChange={onChange}>
                {options.map((opt) => (
                    <option selected={opt._id === selected} value={opt._id}>{opt.name}</option>
                ))}
            </select>
        </div>
    )
}