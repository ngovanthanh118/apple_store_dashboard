export default function ButtonAction({ children }) {
    return (
        <div>
            <button className="bg-sky-800 text-white px-4 py-2 rounded-2xl">
                {children}
            </button>
        </div>
    )
}