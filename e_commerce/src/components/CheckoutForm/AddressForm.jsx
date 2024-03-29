import React,{useState, useEffect} from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './FormInput'
import {commerce} from '../../lib/commerce'
import {Link} from 'react-router-dom';

const AddressForm = ({checkoutToken, next}) => {
    const methods = useForm()

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setshippingSubdivisions] = useState([]);
    const [shippingSubdivision, setshippingSubdivision] = useState('');
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name])=>(
        {id:code, label:name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>(
            {id:code, label:name}))

    const options = shippingOptions.map((so)=>({id:so.id, label:`${so.description}-(${so.price.formatted_with_symbol})`}))


    
    const fetchShippingCountries = async(checkoutTokenId)=>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        // [AL, AT, ]
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }
    

    const fetchSubdivisions = async(countriyCode)=>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countriyCode);
        setshippingSubdivisions(subdivisions);
        setshippingSubdivision(Object.keys(subdivisions)[0]);

    }

    const fetchShippingOptions = async(checkoutTokenId, country, region=null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        setshippingOptions(options);
        setshippingOption(options[0].id);
    }


    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
    },[]);

    useEffect(()=>{
        shippingCountry && fetchSubdivisions(shippingCountry);
    },[shippingCountry]);

    useEffect(()=>{
        shippingSubdivision && fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    },[shippingSubdivision])
    return (
        <div>
            <Typography variant="h6" gutterButtom> Shipping Address 
            <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit((data)=>next({...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                        <Grid container spacing={3}>
                            <FormInput required name='firstName' label='First name'/>
                            <FormInput required name='lastName' label='Last name'/>
                            <FormInput required name='address1' label='address line 1'/>
                            <FormInput required name='email' label='Email'/>
                            <FormInput required name='city' label='City'/>
                            <FormInput required name='zip' label='ZIP/ PostCode'/>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Country</InputLabel>
                                <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                    {countries.map((country)=>(
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                        </MenuItem> 
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Subdivision</InputLabel>
                                <Select value={shippingSubdivision} fullWidth onChange={(e)=>setshippingSubdivision(e.target.value)}>
                                    {subdivisions.map((subdivision)=>(
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem> 
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Options</InputLabel>
                                <Select value={shippingOption} fullWidth onChange={(e)=>setshippingOption(e.target.value)}>
                                    {options.map((option)=>(
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem> 
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <br />
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <Button component={Link} to="/cart">Back to Cart</Button>
                            <Button type="submit" variant="contained" color="primary">Next</Button>
                        </div>
                    </form>
                </FormProvider>
            </Typography>
        </div>
    )
}

export default AddressForm
