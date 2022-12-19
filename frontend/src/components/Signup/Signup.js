import React, { useEffect, useState } from 'react';
import { Container,Grid,OutlinedInput,Typography,InputLabel,MenuItem,Select,Button} from '@material-ui/core';
import { 
    Box, 
    makeStyles, 
    withStyles,
    FormHelperText,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { allUsersSignUp } from '../../Redux/Actions/SignUpAction';
import validateSignUp from "./ValidateSignup";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#f2f2f2",
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
    },
    boxImg: {
        width: "450px",
        display: "flex",
        height: "40px",
        justifyContent: "center",
        margin: "60px 0 30px"
    },
    imgLogo: {
        height: "30px",
        cursor: "pointer"
    },
    boxForm: {
        backgroundColor: "#ffffff",
        width: "450px",
        padding: "20px"
    },
    outlinedInput: {
        height: "48px",
        width: "400px",
        margin: "7px 0",
    },
    h5: {
        fontWeight: "600"
    },
    formhelperText: {
        fontWeight: "700",
        fontSize: "14px",
        color: "black"
    },
    checkbox: {
        marginBottom: "10px"
    },
    button: {
        width: "350px",
        borderRadius: "20px",
        height: "40px"
    },
    divider: {
        backgroundColor: "#f2f2f2",
        heigth: "10px",
        width: "150px",
        margin: "0 30px"
    },
    pageBreak: {
        backgroundColor: "#f2f2f2",
        heigth: "10px",
        width: "440px",
        margin: "30px 30px 20px"
    },
    errorDisplay: {
        color: "red",
        fontWeight: "700",
    },
}))

const SignInButton = withStyles((theme) => ({
    root: {
        color: "#ffffff",
      backgroundColor: "#085ff7",
      cursor: "pointer",
      '&:hover': {
        backgroundColor: "#0542ac",
      },
    },
}))(Button);

function Signup() {
    const isValid = useSelector(state=>state.signup.isValid);
    const isError = useSelector(state=>state.signup.isError);
    const response = useSelector(state=>state.signup.responseFromServer);
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(-1);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
 
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onRoleChange = (e) => {
        setRole(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "email" : email,
            "password" : password,
            "role" : role
        }
        const error = await validateSignUp(data);
        if (Object.keys(error).length !== 0) {
            setErrors(error);
        } else {
            setErrors({});
            await dispatch(allUsersSignUp(data));
        }
    }

    return (
        <Container className = {classes.container} maxWidth = "xl">
            {
                response && (isValid & response.role === 0)  && <Redirect to="/login" />
            }
            {
                response && (isValid & response.role === 1)  && <Redirect to="/addemployer" />
            }
            <Box className = {classes.boxImg}>
                <img
                    className = {classes.imgLogo}
                    src = {"/Images/Indeed_logo.png"}
                    alt = "Indeed"
                />
            </Box>
            <Box className = {classes.boxForm}>
                    <div style={{ textAlign: "center", fontWeight: "700" }}>
                    {isError && (
                            <p className={classes.errorDisplay}>
                            {"User already exists"}
                            </p>
                    )}
                    </div>
                    <Grid container spacing = {3} >
                    <Grid item>
                        <Typography className = {classes.h5} variant = "h5">Create an Account (it's free)</Typography>
                    </Grid>
                    <Grid item>
                        <form onSubmit = { handleSubmit }>
                            <FormHelperText className = {classes.formhelperText}>Email Address</FormHelperText>
                            <OutlinedInput  className = {classes.outlinedInput} onChange = { onEmailChange } value = { email } type = "text" variant="outlined"/>
                            {errors.email && (
                                <p className={classes.errorDisplay}>{errors.email}</p>
                            )}
                            <FormHelperText className = {classes.formhelperText}>Password</FormHelperText>
                            <OutlinedInput  className = {classes.outlinedInput} onChange = { onPasswordChange } value = { password } type = "password" variant="outlined"/>
                            {errors.password && (
                                <p className={classes.errorDisplay}>{errors.password}</p>
                            )}
                            <FormHelperText className = {classes.formhelperText}>Role</FormHelperText>
                            <Select onChange={ onRoleChange } value={role}>
                            <MenuItem value={0}>JobSeeker</MenuItem>
                            <MenuItem value={1}>Employer</MenuItem>
                            </Select>
                            {errors.role && (
                                <p className={classes.errorDisplay}>{errors.role}</p>
                            )}
                            <br/>
                            <br />
                            <SignInButton type = "submit" className = {classes.button} variant = "contained">
                                Create Account
                            </SignInButton>
                        </form>
                    </Grid>
                    <hr className = {classes.pageBreak}></hr>
                </Grid>
            </Box>
            <Grid container spacing = {3} style = {{ flexDirection : "column", alignContent: "center", margin: "20px 0", color: "#085ff7"}}>
                <Grid item>
                    <Typography variant = "body2" component={Link} to="/login" style = {{cursor: "pointer",color: "#085ff7"}}>
                        Have an account? Sign in
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}


export default Signup;