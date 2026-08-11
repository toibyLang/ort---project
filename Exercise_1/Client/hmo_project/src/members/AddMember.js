import Joi from "joi";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useState } from "react";
import Typography from '@mui/material/Typography';
import { addMemberToServer } from './memberApi';
import { useNavigate } from "react-router-dom";

const AddMember = () => {

    
    const schema = Joi.object({
        firstName: Joi.string().required().messages({
            'string.empty': 'שדה זה הוא שדה חובה ',
            'string.pattern.base': 'שדה זה יכול להכיל אותיות בלבד'
        }),
        lastName: Joi.string().required().messages({
            'string.empty': 'שדה זה הוא שדה חובה ',
            'string.pattern.base': 'שדה זה יכול להכיל אותיות בלבד'
        }),
        id: Joi.string().min(9).max(9).pattern(new RegExp('^[0-9]{9}')).required().messages({
            'string.empty': 'שדה זה הוא שדה חובה ',
            'string.pattern.base': 'שדה זה יכול להכיל מספרים בלבד'
        }),
        address: Joi.object({
            city: Joi.string().required().messages({
                'string.empty': 'שדה זה הוא שדה חובה ',
                'string.pattern.base': 'שדה זה יכול להכיל אותיות בלבד'
            }),
            street: Joi.string().required().messages({
                'string.empty': 'שדה זה הוא שדה חובה ',
                'string.pattern.base': 'שדה זה יכול להכיל אותיות בלבד'
            }),
            houseNumber: Joi.string().required().messages({
                'string.empty': 'שדה זה הוא שדה חובה ',
                'string.pattern.base': 'שדה זה יכול להכיל אותיות בלבד'
            })
        }),
        dateOfBirth: Joi.date().required().messages({
            'date.base': 'שדה זה הוא שדה חובה '
        }),
        phone: Joi.string().pattern(new RegExp('^[0-9]{9}')).required().messages({
            'string.empty': 'שדה זה הוא שדה חובה ',
            'string.pattern.base': 'שם פרטי יכול להכיל מספרים בלבד'
        }),
        cellphone: Joi.string().pattern(new RegExp('^[0-9]{10}')).required().messages({
            'string.empty': 'שדה זה הוא שדה חובה ',
            'string.pattern.base': 'שדה זה יכול להכיל עשרה מספרים מ-0 עד 9 בלבד'
        }),
        vaccinations: Joi.array().items({
            date: Joi.date().optional().allow(null, ''),
            producer: Joi.string().optional().allow('')
        }).max(4),

        dateOfPositiveReply: Joi.date().optional().allow(null, ''),
        recoveryDate: Joi.date().optional().allow(null, ''),

    });

    let { register, handleSubmit, formState: { errors }, formState: { isValid } } = useForm({
        resolver: joiResolver(schema)
    })
    let navigate = useNavigate()
    const addNewMember = async (data) => {
        try {
            data.vaccinations = data.vaccinations.filter(obj => obj["date"] !== '');
            let member = await addMemberToServer(data)
            alert("הצליח")
            navigate("/")
        }
        catch (err) {
            alert(err.response.data.message, data)
        }
    }
    let [cntVac, setCntVac] = useState(1);
    return (
        <div style={{ direction: "rtl" }}>
            <Typography style={{ fontSize: "2rem", marginTop: "2%", marginRight: "36%" }} variant="subtitle1" gutterBottom>נא מלאו את טופס ההרשמה</Typography>
            <Typography style={{ fontSize: "1rem", marginRight: "40%", color: "red" }} variant="subtitle1" gutterBottom>שדות המסומנים ב* הינם שדות חובה</Typography>
            <form onSubmit={handleSubmit(addNewMember)} style={{ direction: "rtl", marginTop: "2%", marginRight: "25%" }}>
                <TextField label="*שם פרטי" type="text"  {...register("firstName")} style={{ marginLeft: "1%" }} />
                <TextField label="*שם משפחה" type="text"  {...register("lastName")} />
                <TextField label="*מספר זהות" type="text"  {...register("id")} style={{ marginRight: "1%" }} />
                <div style={{ display: 'flex' }}>
                    {errors.firstName && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginLeft: "1%" }} variant="filled" severity="error"> {errors.firstName.message}</Alert>}
                    {errors.lastName && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginLeft: "1%" }} variant="filled" severity="error"> {errors.lastName.message}</Alert>}
                    {errors.id && <Alert style={{ maxWidth: "17%", marginTop: "0.5%" }} variant="filled" severity="error">{errors.id.message}</Alert>}
                </div>
                <br />
                <TextField label="*עיר" type="text"  {...register("address.city")} style={{ marginLeft: "1%", marginTop: "1%" }} />
                <TextField label="*רחוב" type="text"  {...register("address.street")} style={{ marginLeft: "1%", marginTop: "1%" }} />
                <TextField label="*מספר בית" type="text"  {...register("address.houseNumber")} style={{ marginTop: "1%" }} />
                <div style={{ display: 'flex' }}>
                    {errors.address && errors.address.city && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginLeft: "1%" }} variant="filled" severity="error">{errors.address.city.message}</Alert>}
                    {errors.address && errors.address.street && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginLeft: "1%" }} variant="filled" severity="error">{errors.address.street.message}</Alert>}
                    {errors.address && errors.address.houseNumber && <Alert style={{ maxWidth: "17%", marginTop: "0.5%" }} variant="filled" severity="error">{errors.address.houseNumber.message}</Alert>}
                </div>
                <br />
                <TextField label="*תאריך לידה" type="date" InputLabelProps={{ shrink: true, }} {...register("dateOfBirth")} style={{ marginRight: "22%", marginTop: "1%" }} />
                {errors.dateOfBirth && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginRight: "20.5%" }} variant="filled" severity="error">{errors.dateOfBirth.message}</Alert>}
                <br />
                <TextField label="*טלפון" type="text"  {...register("phone")} style={{ marginRight: "11%", marginLeft: "1%", marginTop: "1%" }} />
                <TextField label="*טלפון נייד" type="text"  {...register("cellphone")} style={{ marginTop: "1%" }} />
                <div style={{ display: 'flex' }}>
                    {errors.phone && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginRight: "11%", marginLeft: "1%" }} variant="filled" severity="error">{errors.phone.message}</Alert>}
                    {errors.cellphone && <Alert style={{ maxWidth: "17%", marginTop: "0.5%" }} variant="filled" severity="error">{errors.cellphone.message}</Alert>}
                </div>
                <br />
                {cntVac>0&&<TextField label="תאריך חיסון" type="date" InputLabelProps={{ shrink: true, }} {...register("vaccinations[0].date")} style={{ marginRight: "13%", marginLeft: "1%", marginTop: "1%" }} />}
                {cntVac>0&&<TextField label="יצרנית חיסון" type="text"  {...register("vaccinations[0].producer")} style={{ marginTop: "1%" }} />}
                 <div style={{ display: 'flex' }}>
                    {errors.vaccinations && errors.vaccinations[0].date && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginRight: "11%", marginLeft: "1%" }} variant="filled" severity="error">{errors.vaccinations[0].date.message}</Alert>}
                    {errors.vaccinations && errors.vaccinations[0].producer && <Alert style={{ maxWidth: "17%", marginTop: "0.5%" }} variant="filled" severity="error">{errors.vaccinations[0].producer.message}</Alert>}
                </div>
                {cntVac>1&&<br/>}
                {cntVac>1&&<TextField label="תאריך חיסון" type="date" InputLabelProps={{ shrink: true, }} {...register("vaccinations[1].date")} style={{ marginRight: "13%", marginLeft: "1%", marginTop: "1%" }} />}
                {cntVac>1&&<TextField label="יצרנית חיסון" type="text"  {...register("vaccinations[1].producer")} style={{ marginTop: "1%" }} />}
                <div style={{ display: 'flex' }}>
                    {errors.vaccinations && errors.vaccinations[1].date && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginRight: "11%", marginLeft: "1%" }} variant="filled" severity="error">{errors.vaccinations[1].date.message}</Alert>}
                    {errors.vaccinations && errors.vaccinations[1].producer && <Alert style={{ maxWidth: "17%", marginTop: "0.5%" }} variant="filled" severity="error">{errors.vaccinations[1].producer.message}</Alert>}
                </div>
                {cntVac>2&&<br/>}
                {cntVac>2&&<TextField label="תאריך חיסון" type="date" InputLabelProps={{ shrink: true, }} {...register("vaccinations[2].date")} style={{ marginRight: "13%", marginLeft: "1%", marginTop: "1%" }} />}
                {cntVac>2&&<TextField label="יצרנית חיסון" type="text"  {...register("vaccinations[2].producer")} style={{ marginTop: "1%" }} />}
                <div style={{ display: 'flex' }}>
                    {errors.vaccinations && errors.vaccinations[2].date && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginRight: "11%", marginLeft: "1%" }} variant="filled" severity="error">{errors.vaccinations[2].date.message}</Alert>}
                    {errors.vaccinations && errors.vaccinations[2].producer && <Alert style={{ maxWidth: "17%", marginTop: "0.5%" }} variant="filled" severity="error">{errors.vaccinations[2].producer.message}</Alert>}
                </div>
                {cntVac>3&&<br/>}
                {cntVac>3&&<TextField label="תאריך חיסון" type="date" InputLabelProps={{ shrink: true, }} {...register("vaccinations[3].date")} style={{ marginRight: "13%", marginLeft: "1%", marginTop: "1%" }} />}
                {cntVac>3&&<TextField label="יצרנית חיסון" type="text"  {...register("vaccinations[3].producer")} style={{ marginTop: "1%" }} />}
                 {cntVac!=4&&<Button variant="outlined" style={{color:"black", borderColor:"gray", marginRight:"30%", marginTop:"2%", minWidth:"4%"}} onClick={()=>{setCntVac(cntVac+1)}}>+</Button>}
                <div style={{ display: 'flex' }}>
                    {errors.vaccinations && errors.vaccinations[3].date && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginRight: "11%", marginLeft: "1%" }} variant="filled" severity="error">{errors.vaccinations[3].date.message}</Alert>}
                    {errors.vaccinations && errors.vaccinations[3].producer && <Alert style={{ maxWidth: "17%", marginTop: "0.5%" }} variant="filled" severity="error">{errors.vaccinations[3].producer.message}</Alert>}
                </div>
               
                
               
                <br />
                <TextField label="תאריך תוצאה חיובית" type="date" InputLabelProps={{ shrink: true, }} {...register("dateOfPositiveReply")} style={{ marginRight: "15%", marginLeft: "1%", marginTop: "1%" }} />
                <TextField label="תאריך החלמה" type="date" InputLabelProps={{ shrink: true, }} {...register("recoveryDate")} style={{ marginTop: "1%" }} />
                <div style={{ display: 'flex' }}>
                    {errors.dateOfPositiveReply && <Alert style={{ maxWidth: "17%", marginTop: "0.5%", marginRight: "11%", marginLeft: "1%" }} variant="filled" severity="error">{errors.dateOfPositiveReply.message}</Alert>}
                    {errors.recoveryDate && <Alert style={{ maxWidth: "17%", marginTop: "0.5%" }} variant="filled" severity="error">{errors.recoveryDate.message}</Alert>}
                </div>
                <br />
                <Button type="submit" variant="contained" style={{ backgroundColor: "black", marginRight: "28%" }}>הרשמה</Button>
            </form>
        </div>
    );
}
export default AddMember;