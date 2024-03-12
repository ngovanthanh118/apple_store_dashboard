import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "../../utils";
import FormControl from "../../components/FormControl";
import TextInput from "../../components/TextInput";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";

export default function AddCategoryPage() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handleAddCategory = (ev) => {
        ev.preventDefault();
        axios.post('/categories/', {
            name: name
        }, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                toast.success(res.data.msg)
                navigate('/category');
            })
            .catch(err => "Add category failured!")
    }
    return (
        <div className="p-4">
            <FormControl onSubmit={handleAddCategory}>
                <Thumbnail
                    title="Category"
                    goBack="/category"
                    action="Add category"
                />
                <TextInput
                    title="Name"
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                />
                <ButtonAction>Add category</ButtonAction>
            </FormControl>
        </div>
    )
}