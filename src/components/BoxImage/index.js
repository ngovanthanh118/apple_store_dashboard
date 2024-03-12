export default function BoxImage({ title, image, width = "120px", height = "100px" }) {
    return (
        <div className="flex gap-4">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <img src={`${process.env.REACT_APP_API_URL}/images/` + image} alt="image" width={width} height={height} />
        </div>
    )
}