import {React, useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Button, Divider, CssBaseline} from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';
import {commerce} from '../../../lib/commerce';
import {Link, useHistory} from 'react-router-dom';
const steps = ['Shipping addresss', 'Payment details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const history = useHistory();

    useEffect(()=>{
        const generateToken = async()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});
                setCheckoutToken(token);
            }catch(error){
                history.push('/');
        }
        generateToken();
    }},[cart]);

    const next = (data)=>{
        setShippingData(data);
        nextStep();
    }

    const nextStep= ()=>setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep= ()=>setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const timeout = ()=>{
        setTimeout(()=>{
            setIsFinished(true)
        },3000);
    }
    let Confirmation = ()=>order.customer ?(
        <>
        <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider}/>
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br/>
        <Button component={Link} to="/" variant="outlined" type="button"> Back to Home</Button>
        </>
    ): isFinished?(
        <>
        <div>
            <Typography variant="h5">Thank you for your purchase</Typography>
            <Divider className={classes.divider}/>
        </div>
        <br/>
        <Button component={Link} to="/" variant="outlined" type="button"> Back to Home</Button>
        </>
    ):
    (
        <div className={classes.spinner}>
         <CircularProgress/>
        </div>
    );

    if(error){
        Confirmation=()=>(
        <>
            <Typography variant="h5">Error:{error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button"> Back to Home</Button>
        </>
        )
    }

    const Form = ()=> activeStep===0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout}/>

    // reder jsx => useeffect
    return (
        <>
        <CssBaseline/>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep===steps.length ? <Confirmation/>: checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
