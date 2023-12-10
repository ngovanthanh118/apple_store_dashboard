export default function TextAreaInput({ title, value, onChange }) {
    return (
        <div className="flex gap-4">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <textarea
                className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                id="description"
                name="description"
                rows="4"
                cols="50"
                onChange={onChange}
                value={value}
            >
            </textarea>
        </div>
    )
}