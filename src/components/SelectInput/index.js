export default function SelectInput({ title, options, values, onChange, selected="mobile" }) {
    return (
        <div className="flex gap-4 ">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <select onChange={onChange}>
                {options.map((opt, index) => (
                    <option selected={selected === values[index]} value={values[index]}>{opt}</option>
                ))}
            </select>
        </div>
    )
}