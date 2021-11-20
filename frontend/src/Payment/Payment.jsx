import React, { useState, useEffect } from 'react'
import { TextField, Stack, styled, Grid, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { AiOutlineCalendar } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import listingsService from '../Services/listingsService';
import locationIcon from "../assets/images/location-icon.png"
import arrowIcon from "../assets/images/arrows.png"
import PaypalButton from './PaypalButton'
const StyledTextField = styled(TextField)`
  .MuiFilledInput-root {
    cursor: pointer;
    background-color: white;
    border-radius: 6px;
    height: 76px
  }
`
export default function Payment() {
    let initialTime = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    const [result, setResult] = useState([])
    const [timing, setTiming] = useState([])
    const [model, setmodel] = useState(null);
    const [loader, setloader] = useState(false);
    const [value, setValue] = useState(new Date())
    const [amount, setAmount] = useState(0)
    let { id } = useParams();

    const getModelDetailsData = async () => {
        setloader(true);
        const response = await listingsService.getModelDetails(id);
        setmodel(response.data);
        setloader(false);
    }
    const getModelSlots = async (date) => {
        const response = await listingsService.getModelSlots(id, `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        let a = response.data.map(r => r.start_time.slice(0, 2))
        if (a.length > 1) {
            initialTime = initialTime.filter(z => !a.includes(z.toString()))
            let g = []
            for (let i = 0, j = initialTime.length; i < j; i += 4) {
                g.push(initialTime.slice(i, i + 4))
            }
            setResult(g)
        }
    }
    const handleChange = (newValue) => {
        setTiming([])
        setValue(newValue);
    };
    const bookTime = (time) => {
        let newTiming = timing
        if (newTiming.includes(time)) {
            newTiming = newTiming.filter(t => t !== time)
            setTiming(newTiming)
            return
        }
        newTiming.push(time)
        setTiming([...newTiming])
    }
    useEffect(() => {
        getModelDetailsData();
    }, [])
    useEffect(() => {
        getModelSlots(value)
        let g = []
        for (let i = 0, j = initialTime.length; i < j; i += 4) {
            g.push(initialTime.slice(i, i + 4))
        }
        setResult(g)
    }, [value])
    useEffect(() => {
        if (model !== null) setAmount(model.rate * timing.length)
    }, [timing])
    return (
        <Grid container>
            <Grid item lg={3.5} md={12} sm={12} xs={12} sx={{ pt: 4, pl: 4 }}>
                {model && <img src={model.image_link[0]} width={260} height={360} alt={model.model_name} />}
            </Grid>
            <Grid item lg={5.5} md={7} sm={12} xs={12} sx={{ pt: 4 }}>
                <div style={{ display: 'flex', marginBottom: 100 }}>
                    <div style={{ marginRight: 120 }}>
                        <h1 className="model-name">{model && model.model_name}</h1>
                        <div className="d-flex align-items-center">
                            <img src={locationIcon} style={{ height: "15px" }} />
                            <span className="country ml-1">{model && model.country}</span>
                        </div>
                    </div>
                    <div style={{ marginRight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h6 style={{ marginTop: 10 }}>Rates</h6>
                        <h6 style={{ fontWeight: 'bold' }}>${model && model.rate} / hr</h6>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h6 style={{ marginTop: 10 }}>Availability</h6>
                        <h6 style={{ fontWeight: 'bold' }}>{model && `${new Date(model.start_date).toLocaleDateString("en-us", { month: 'long', year: 'numeric' })} -
                                    ${new Date(model.end_date).toLocaleDateString("en-us", { month: 'long', year: 'numeric' })}`}</h6>
                    </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            minDate={new Date(Date.now())}
                            maxDate={model && new Date(model.end_date)}
                            label='Date'
                            inputFormat="eeee, dd MMM yyyy"
                            value={value}
                            onChange={handleChange}
                            InputProps={{
                                disableUnderline: true
                            }}
                            PopperProps={{
                                placement: 'bottom-start'
                            }}
                            components={{ OpenPickerIcon: () => (<AiOutlineCalendar />) }}
                            renderInput={(params) => <StyledTextField {...params} variant='filled'
                                style={{ width: 320, border: '1px solid gray', borderRadius: 6 }}
                            />}
                        />
                    </Stack>
                </LocalizationProvider>
                <div style={{ marginTop: 60 }}>
                    {result.map((arr, index) => (
                        <div key={index} style={{ display: 'flex', marginTop: 20 }}>
                            {arr.map((time, i) => (
                                <div key={i} style={{
                                    border: `1px solid ${!timing.includes(time) ? 'lightgray' : 'black'}`, borderRadius: 6,
                                    cursor: 'pointer', width: 120, height: 50, paddingTop: 10, marginRight: 40, fontSize: 18,
                                    fontFamily: 'Segoe UI'
                                }} onClick={() => bookTime(time)}>
                                    {time > 12 ? time - 12 : time} : 00 {index === 0 && i === 0 ? 'a' : 'p'}m
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Grid>
            <Grid item lg={3} md={5} sm={12} xs={12} sx={{ pt: 4, textAlign: 'left', pr: 4 }}>
                <h2 style={{ fontWeight: 'bold' }}>Summary</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
                    <h4>Subtotal</h4>
                    <h4>${amount}</h4>
                </div>
                <hr style={{ marginLeft: 0, marginTop: 20 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                    <h4>Total</h4>
                    <h4>SGD <span><b>${amount}</b></span></h4>
                </div>
                <PaypalButton model={model} timing={timing} date={value} />
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3>{JSON.stringify(timing)}</h3><br />
                <h3>result arr: {JSON.stringify(result.flat(1))}</h3>
            </div>
            {/*<h3>{JSON.stringify(model)}</h3>
            <h3>{model && `${new Date(model.created_at).toLocaleDateString( )} ${new Date(model.created_at).getFullYear()}`}</h3> */}
        </Grid>
    )
}