export default function FormControl({ children, onSubmit }) {
    return (
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
            {children}
        </form>
    )
}