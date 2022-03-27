import { useCallback, useEffect, useState } from "react";
import { getValidationErrors } from "../../../../../core/utils/validation";
import Button from "../../../../Design/Button";
import Input from "../../../../Design/Input";
import * as yup from 'yup';
import CampusSelect from "../../../Users/Select/CampusSelect";

const schema = yup.object().shape({
    campus: yup.string(),
});

const defaultData = {
    campus: '',
}

const OrganisationLinkForm = ({onSubmit, initialData={}, disabled}) => {

    const [isTouched, setIsTouched] = useState(false);
    const [data, setData] = useState({
        ...defaultData,
        ...initialData,
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({
           ...data,
           [e.target.name]: e.target.value
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


    return (
        <form noValidate={true} onSubmit={handleSubmit}>

            <CampusSelect
                label="campus"
                name="campus"
                value={data.campus}
                disabled={disabled}
                onChange={handleChange}
                error={errors.role}
            />

            <Button className='mt-4' type="submit" disabled={disabled}>
                {data._id ? 'Update' : 'Create'}
            </Button>

        </form>
    )

}

export default OrganisationLinkForm;