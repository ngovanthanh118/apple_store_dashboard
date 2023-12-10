export default function BoxImage({ title, image, width = "120px", height = "100px" }) {
    return (
        <div className="flex gap-4">
            <h1 className="text-sm font-medium w-24">{title}</h1>
            <img src={"https://apple-store-server-8705f39d5697.herokuapp.com/api/v1/images/" + image} alt="image" width={width} height={height} />
        </div>
    )
}