export default function ImageInput({title, onChange}) {
    return (
        <div className="flex gap-4 ">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <label for="file" className="flex flex-col gap-2 rounded-xl items-center bg-gray-200 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                </svg>
                <span>
                    Choose an image
                </span>
            </label>
            <input
                className="hidden"
                type="file"
                id="file"
                onChange={onChange}
            />
        </div>
    )
}