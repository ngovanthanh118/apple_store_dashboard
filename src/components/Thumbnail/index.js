import { Link } from "react-router-dom"
export default function Thumbnail({ action, goBack, title }) {
    return (
        <div className="flex items-center gap-2 text-sky-800 text-xl font-semibold mb-2">
            <Link to={goBack}>
                {title}
            </Link>
            <span>/</span>
            <h1 className="text-sky-800 text-xl font-semibold">{action}</h1>
        </div>
    )
}