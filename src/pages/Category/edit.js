import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import FormControl from "../../components/FormControl";
import TextInput from "../../components/TextInput";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";
export default function EditCategoryPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const loadCategory = () => {
        axios.get('/categories/edit/' + id, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                const category = res.data.data;
                setCategory(category)
                setName(category.name);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setLoading(true);
        loadCategory();
    }, [id])
    const handleUpdateCategory = (ev) => {
        setLoading(true);
        ev.preventDefault();
        axios.put('/categories/' + id, { name: name }, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                loadCategory();
                toast.success(res.data.msg);
            })
            .catch(err => toast.error("Update category failured!"))
    }
    return (
        <div className="flex justify-center items-center h-full relative">
            {loading ?
                <BarLoader
                    color="#075985"
                    loading={loading}
                    size={50}
                /> :
                <div className="p-4 abosulute top-0 left-0 w-full h-full">
                    <FormControl onSubmit={handleUpdateCategory}>
                        <Thumbnail
                            title="Product"
                            goBack="/product"
                            action={`Edit ${category.name}`}
                        />
                        <TextInput
                            title="Name"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                        />
                        <ButtonAction>Save Changes</ButtonAction>
                    </FormControl>
                </div>
            }
        </div>
    )
}