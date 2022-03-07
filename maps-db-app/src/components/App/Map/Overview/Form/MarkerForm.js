import { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../../core/utils/validation";
import Button from "../../../../Design/Button";
import Input from "../../../../Design/Input";
import * as yup from 'yup';
// import RoleSelect from "../Select/RoleSelect";
import useSuperAdmin from "../../../../../core/hooks/useSuperAdmin";

const schema = yup.object().shape({
    name: yup.string().required(),
    imageLink: yup.string().url().required(),
    latitude: yup.number().required().min(-90).max(90),
    longitude: yup.number().required().min(-180).max(180),
    publish: yup.boolean().nullable(),
});

const defaultData = {
    name: '',
    imageLink: '',
    latitude: '',
    longitude: '',
    published: false,
}

const MarkerForm = ({onSubmit, initialData={}, disabled, isNew}) => {
    const [isTouched, setIsTouched] = useState(false);
    const [data, setData] = useState({
        ...defaultData,
        ...initialData,
    });
    
    const [errors, setErrors] = useState({});
    let publish = defaultData.publish;

    const handleChange = (e) => {
        if(e.target.value === 'radio1') {
            publish = true;
        } else if(e.target.value === 'radio2'){
            publish = false;  
        }
        setData({
            ...data,
            [e.target.name]: e.target.value,
            'published': publish
        })
    }

    const validate = useCallback((data, onSuccess) => {
        schema.validate(data, {abortEarly: false})
        .then(() => {
            if(onSuccess) {
                onSuccess();
            }
        })
        .catch((err) => {
            setErrors(getValidationErrors(err));
        });
    }, []);

    useEffect(() => {
        if(isTouched) {
            validate(data);
        }
    }, [validate, isTouched, data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTouched(true);
        validate(data, () => onSubmit(data))
    }

    const superAdmin = useSuperAdmin();

    const publishInput = document.getElementById('publish');

    return (
        
        <form noValidate={true} onSubmit={handleSubmit}>

            <Input
                label="Name"
                type="text"
                name="name"
                value={data.name}
                disabled={disabled}
                onChange={handleChange}
                error={errors.name}
            />

            <Input
                label="ImageLink"
                type="text"
                name="imageLink"
                value={data.imageLink}
                disabled={disabled}
                onChange={handleChange}
                error={errors.imageLink}
            />

            <Input
                label="Latitude"
                type="number"
                name="latitude"
                value={data.latitude}
                disabled={disabled}
                onChange={handleChange}
                error={errors.latitude}
            />

            <Input
                label="Longitude"
                type="number"
                name="longitude"
                value={data.longitude}
                disabled={disabled}
                onChange={handleChange}
                error={errors.longitude}
            />

            {
                superAdmin && (
                    <>
                        <input type="radio" id="publish" name="published" value="radio1" onChange={handleChange}/>
                        <label htmlFor="publish">Publish</label><br/>
                        <input type="radio" id="dontpublish" name="published" value="radio2" onChange={handleChange} defaultChecked />
                        <label htmlFor="dontpublish">Don't publish</label><br/>
                    </>
                )
            }

            <Button className='mt-4' type="submit" disabled={disabled}>
                {data._id ? 'Update' : 'Create'}
            </Button>

        </form>
    )

}

export default MarkerForm;