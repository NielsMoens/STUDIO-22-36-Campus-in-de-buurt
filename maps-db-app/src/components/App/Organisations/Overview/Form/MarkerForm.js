import { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../../core/utils/validation";
import Button from "../../../../Design/Button";
import Input from "../../../../Design/Input";
import * as yup from 'yup';
// import RoleSelect from "../Select/RoleSelect";
import useSuperAdmin from "../../../../../core/hooks/useSuperAdmin";
import CampusSelect from "../../../Users/Select/CampusSelect";

const schema = yup.object().shape({
    name: yup.string().required(),
    imageLink: yup.string().url().required(),
    latitude: yup.number().required().min(-90).max(90),
    longitude: yup.number().required().min(-180).max(180),
    publish: yup.boolean().nullable(),
});

const defaultData = {
    type: 'campus',
    name: '',
    imageLink: '',
    latitude: '',
    longitude: '',
    published: false,
    campus: ''
}

const MarkerForm = ({onSubmit, initialData={}, disabled, isNew}) => {
    const [isTouched, setIsTouched] = useState(false);
    const [typeMarker, setTypeMarker] = useState(false);

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
        if(e.target.name === 'type') {
            if(e.target.value !== 'campus') {
                setTypeMarker(true)
            } else {
                setTypeMarker(false)
            }
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

    return (
        
        <form noValidate={true} onSubmit={handleSubmit}>
            
            <input type="radio" id="type1" name="type" value="campus" onChange={handleChange} defaultChecked/>
            <label htmlFor="type1">Campus</label><br/>
            
            <input type="radio" id="type2" name="type" value="company" onChange={handleChange}/>
            <label htmlFor="type2">Company</label><br/>
            
            <input type="radio" id="type3" name="type" value="organisation" onChange={handleChange} />
            <label htmlFor="type3">Organisation</label><br/>
            
            <input type="radio" id="type4" name="type" value="other" onChange={handleChange} />
            <label htmlFor="type4">Other</label><br/><br/>

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
                typeMarker && (
                    <CampusSelect
                        label="campus"
                        name="campus"
                        value={data.campus}
                        disabled={disabled}
                        onChange={handleChange}
                        error={errors.role}
                    />
                )
            }

            {
                superAdmin && (
                    <>
                        <br/>
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
