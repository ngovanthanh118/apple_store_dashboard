export default function FormControl({ children, onSubmit }) {
    return (
        <form className="flex flex-col gap-2 px-6 overflow-y-auto" onSubmit={onSubmit}>
            {children}
        </form>
    )
}