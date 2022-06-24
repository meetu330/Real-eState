import React , {useState, useRef} from "react";
import { Link, Redirect,useHistory } from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CurrencyInput from 'react-currency-input-field';

const Propertiescreate = () =>{

// =========================================== For Redirect page after form submit ==========================================
    let history = useHistory();

// =================================================== For change url ========================================================
    var answer = window.location.href;
    const answer_array = answer.split("/");

// ======================================================== Start State ======================================================

const [slide, setslide] = useState(false)

    const show = () => {
        if(slide == false) {setslide(true)}
        if(slide == true) {setslide(false)}
    }

// ======================================================= For Form State ======================================================
    const [Owner, setOwner] = useState('')

    const [OwnerError, setOwnerError] = useState('')

    const [Address, setAddress] = useState('')

    const [AddressError, setAddressError] = useState('')

    const [AppraisedValue, setAppraisedValue] = useState('')

    const [AppraisedValueError, setAppraisedValueError] = useState('')

    const [AppraisedDate, setAppraisedDate] = useState('')

    const [AppraisedDateError, setAppraisedDateError] = useState('')

    const [Bank, setBank] = useState('')

    const [BankError, setBankError] = useState('')

    const [StartingPrinciple, setStartingPrinciple] = useState('')

    const [StartingPrincipleError, setStartingPrincipleError] = useState('')

    const [Loan, setLoan] = useState('')

    const [LoanError, setLoanError] = useState('')
    
    const [MonthlyAmount, setMonthlyAmount] = useState('')

    const [MonthlyAmountError, setMonthlyAmountError] = useState('')

    const [CurrentBalance, setCurrentBalance] = useState('')

    const [CurrentBalanceError, setCurrentBalanceError] = useState('')

    const [EscrowBalance, setEscrowBalance] = useState('')

    const [EscrowBalanceError, setEscrowBalanceError] = useState('')

    const [MaturityDate, setMaturityDate] = useState('')

    const [MaturityDateError, setMaturityDateError] = useState('')

    const [TermLength, setTermLength] = useState('')

    const [TermLengthError, setTermLengthError] = useState('')

    const [RenewalSelect, setRenewalSelect] = useState('')

    const [RenewalDate, setRenewalDate] = useState('')

    const [RenewalDateError, setRenewalDateError] = useState('')

    const [RenewalTerms, setRenewalTerms] = useState('')

    const [RenewalTermsError, setRenewalTermsError] = useState('')

    const [Rate, setRate] = useState('')

    const [RateError, setRateError] = useState('')

    const [InterestTermsEndDateSelect, setInterestTermsEndDateSelect] = useState('')

    const [InterestTermsEndDate, setInterestTermsEndDate] = useState('')

    const [InterestTermsEndDateError, setInterestTermsEndDateError] = useState('')

    // Start For Rate Change

    const [RateSelect, setRateSelect] = useState('')
    
    const [RateChangeComment, setRateChangeComment] = useState('')

    const [RateChangeCommentError, setRateChangeCommentError] = useState('')

    const [RateChangeDate, setRateChangeDate] = useState('')

    const [RateChangeDateError, setRateChangeDateError] = useState('')

    const [RateChange, setRateChange] = useState([{ comment: "", date : ""}])

    const [Test, setTest] = useState();

    // End For Rate Change

    // Start For Pre-Payment Penalties

    const [PrePeymentSelect, setPrePeymentSelect] = useState('')

    const [PrePeymentPenaltiesDate, setPrePeymentPenaltiesDate] = useState('')

    const [PrePeymentPenaltiesDateError, setPrePeymentPenaltiesDateError] = useState('')

    const [PrePeymentPenaltiesPenlty, setPrePeymentPenaltiesPenlty] = useState('')

    const [PrePeymentPenaltiesPenltyError, setPrePeymentPenaltiesPenltyError] = useState('')

    const [PrePeymentPenalties, setPrePeymentPenalties] = useState([{ date: "", penlty : ""}])

    const [PreTest, setPreTest] = useState();

    // End For Pre-Payment Penalties

    const [PrePeymentPenaltyEndDate, setPrePeymentPenaltyEndDate] = useState()

    const [PrePeymentPenaltyEndDateError, setPrePeymentPenaltyEndDateError] = useState()

    const [YieldMantenance, setYieldMantenance] = useState()

    const [YieldMantenanceError, setYieldMantenanceError] = useState()

    const [PriorNotice, setPriorNotice] = useState()

    const [PriorNoticeError, setPriorNoticeError] = useState()

    // For disable submit button 
    const[GarbaseValue, setGarbaseValue] = React.useState('');

// ======================================================= For RENEWAL OPTION ==================================================
    const inputOne = useRef();
    const inputTwo = useRef();

    function RenewalEditorNot(e){

        setRenewalSelect(e.target.value)

        if(e.target.value == 1 || e.target.value == 3){
            inputOne.current.disabled = false;
            inputTwo.current.disabled = false;
        }else{
            inputOne.current.disabled = true;
            inputTwo.current.disabled = true;
            
            setRenewalDate('')
            setRenewalTerms('')

            setRenewalDateError('')
            setRenewalTermsError('')

        }
    }
// =============================================== For INTEREST ONLY TERM ===================================================
    const inputThree = useRef();

    function InterestTermEditorNot(e){

        setInterestTermsEndDateSelect(e.target.value)

        if(e.target.value == 1){
            inputThree.current.disabled = false;

        }else{
            inputThree.current.disabled = true;

            setInterestTermsEndDate('')

            setInterestTermsEndDateError('')
        }
    }
// ======================================================= For RATE CHANGE ===================================================
    const inputFour = useRef();
    const inputFive = useRef();
    

    function RateChangeEditorNot(e){

        setRateSelect(e.target.value)

        if(e.target.value == 1){
            inputFour.current.disabled = false;
            inputFive.current.disabled = false;
            

        }else{
            inputFour.current.disabled = true;
            inputFive.current.disabled = true;
            

            inputFour.current.value = '';
            inputFive.current.value = '';

            setRateChangeComment('')
            setRateChangeDate('')

            setRateChangeCommentError('')
            setRateChangeDateError('')

        }
    }
// =========================================== For PRE-PAYPMENT PENALTIES SCHEDULE ==============================================
    const inputSeven = useRef();
    const inputEight = useRef();
    const inputNine = useRef();
    const inputSix = useRef();

    function PrepaymentPenaltiesEditorNot(e){

        setPrePeymentSelect(e.target.value)

        if(e.target.value == 1){
            inputSeven.current.disabled = false;
            inputEight.current.disabled = false;
            inputNine.current.disabled = false;
            inputSix.current.disabled = false;

        }else{
            inputSeven.current.disabled = true;
            inputEight.current.disabled = true;
            inputNine.current.disabled = true;
            inputSix.current.disabled = true;

            setPrePeymentPenaltiesDate('')
            setPrePeymentPenaltiesPenlty('')
            setPrePeymentPenaltyEndDate('')

            let newFormValues = [...PrePeymentPenalties];
            newFormValues.splice(0, Infinity);
            setPrePeymentPenalties(newFormValues)

            setPrePeymentPenaltiesPenltyError('')
            setPrePeymentPenaltiesDateError('')
            setPrePeymentPenaltyEndDateError('')
        }
    }
// ==================================================== For Form Submit ========================================================    
    function formSubmit(e){

        // =========== For Form Validation ===========
        var error = false;
        if(Owner == ''){
            setOwnerError('Field Required');
            var error = true;
        }else{
            setOwnerError('')
        } 
        if(Address == ''){
            setAddressError('Field Required')
            var error = true;
        }else{
            setAddressError('')
        }
        if(AppraisedValue == ''){
            setAppraisedValueError('Field Required')
            var error = true;
        }else{
            setAppraisedValueError('')
        }
        if(AppraisedDate == ''){
            setAppraisedDateError('Field Required')
            var error = true;
        }else{
            setAppraisedDateError('')
        }
        if(Bank == ''){
            setBankError('Field Required')
            var error = true;
        }else{
            setBankError('')
        }
        if(StartingPrinciple == ''){
            setStartingPrincipleError('Field Required')
            var error = true;
        }else{
            setStartingPrincipleError('')
        }
        if(Loan == ''){
            setLoanError('Field Required')
            var error = true;
        }else{
            setLoanError('')
        }
        if(MonthlyAmount == ''){
            setMonthlyAmountError('Field Required')
            var error = true;
        }else{
            setMonthlyAmountError('')
        }
        if(CurrentBalance == ''){
            setCurrentBalanceError('Field Required')
            var error = true;
        }else{
            setCurrentBalanceError('')
        }
        if(EscrowBalance == ''){
            setEscrowBalanceError('Field Required')
            var error = true;
        }else{
            setEscrowBalanceError('')
        }
        if(MaturityDate == ''){
            setMaturityDateError('Field Required')
            var error = true;
        }else{
            setMaturityDateError('')
        }
        if(TermLength == ''){
            setTermLengthError('Field Required')
            var error = true;
        }else{
            setTermLengthError('')
        }

        if(RenewalSelect == 1 || RenewalSelect == ''){
            if(RenewalDate == ''){
                setRenewalDateError('Field Required')
                var error = true;
            }else{
                setRenewalDateError('')
            }
            if(RenewalTerms == ''){
                setRenewalTermsError('Field Required')
                var error = true;
            }else{
                setRenewalTermsError('')
            }
        }

        if(Rate == ''){
            setRateError('Field Required')
            var error = true;
        }else{
            setRateError('')
        }

        if(InterestTermsEndDateSelect == 1 || InterestTermsEndDateSelect == ''){
            if(InterestTermsEndDate == ''){
                setInterestTermsEndDateError('Field Required')
                var error = true;
            }else{  
                setInterestTermsEndDateError('')
            } 
        }

        if(RateSelect == 1 || RateSelect == ''){
            if(RateChangeComment == ''){
                setRateChangeCommentError('Field Required')
                var error = true;
            }else{
                setRateChangeCommentError('')
            }
            if(RateChangeDate == ''){
                setRateChangeDateError('Field Required')
                var error = true;
            }else{
                setRateChangeDateError('')
            }
        }
        
        if(PrePeymentSelect == 1 || PrePeymentSelect == ''){
            if(PrePeymentPenaltiesDate == ''){
                setPrePeymentPenaltiesDateError('Field Required')
                var error = true;
            }else{
                setPrePeymentPenaltiesDateError('')
            }
            if(PrePeymentPenaltiesPenlty == ''){
                setPrePeymentPenaltiesPenltyError('Field Required')
                var error = true;
            }else{
                setPrePeymentPenaltiesPenltyError('')
            }
            if(PrePeymentPenaltyEndDate == null){
                setPrePeymentPenaltyEndDateError('Field Required')
                var error = true;
            }else{
                setPrePeymentPenaltyEndDateError('')
            }
        }
        
        
        if(YieldMantenance == null){
            setYieldMantenanceError('Field Required')
            var error = true;
        }else{
            setYieldMantenanceError('')
        }
        if(PriorNotice == null){
            setPriorNoticeError('Field Required')
            var error = true;
        }else{
            setPriorNoticeError('')
        }

        // ======================== For Submit Form Data ============================
        e.preventDefault();

        const userId = localStorage.getItem('userId');

        const data = new FormData(e.target);
    
        if (answer_array[2] == "localhost:3000") {
            var property = `http://localhost:8000/api/properties/${userId}`;
          }else{
            var property = `https://realestatesbackend.ajcnctools.com/api/properties/${userId}`;
          }

        if(error==false)
        {  
        setGarbaseValue(1);
        axios.post(property, data)
            .then(res => {
                if(res.data.Status==1)
                {
                    toast.success('Property Created Successfully !',{position: toast.POSITION.TOP_CENTER})
                    setTimeout( function() {
                        history.push("/dashboard");
                      }, 3000);
                }
                else
                {
                    // toast.error('Property Create Fail !',{position: toast.POSITION.TOP_CENTER})
                }
              }
            )
            .catch(error => {
                // console.log("ERROR:: ",error.response.data);
            });
        }
        else
        {
            toast.warn('Please fill all Field !',{position: toast.POSITION.TOP_CENTER})
            // alert('Please fill all Field');
        }

    }

    // ==================================== Addmore For PRE-PAYPMENT PENALTIES SCHEDULE  =====================================    
    let handleChange = (i, e) => {
        let newFormValues = [...PrePeymentPenalties];
        newFormValues[i][e.target.name] = e.target.value;
        setPrePeymentPenalties(newFormValues);
     }
    
    let addFormFieldsprepayment = (i) => {

        if(PrePeymentPenaltiesDate == ''){
            setPrePeymentPenaltiesDateError('Field Required')
            setPrePeymentPenaltiesPenltyError('')
        }else if(PrePeymentPenaltiesPenlty == ''){
            setPrePeymentPenaltiesPenltyError('Field Required')
            setPrePeymentPenaltiesDateError('')
        }else{
            setPrePeymentPenaltiesDateError('')
            setPrePeymentPenaltiesPenltyError('')

            // For Defalt Show Textbox Manage
            if(i == 0){
                setPreTest(1);
            }else{
                console.log('fail')
            }
            if(PreTest == 1){
                setPrePeymentPenalties([...PrePeymentPenalties, { date: "", penlty: "" }])
            }else{
                console.log('fail')
            }

        }
        
    }

    let removeFormFieldsprepayment = (i) => {
        let newFormValues = [...PrePeymentPenalties];
        newFormValues.splice(i, 1);
        setPrePeymentPenalties(newFormValues)
    }

// ==================================================== Start Return Design  ===================================================

return (
    <>
                <div className="container mt-4">
                <ToastContainer autoClose={3000} />
                {/* <ToastContainer /> */}

                  <form onSubmit={formSubmit}>
                    <div className="row">
                        <div className="col-lg-8 col-md-6 col-6 ">
                            <h3>Add Property</h3>
                        </div>
                        <div className="col-lg-3 col-md-6  col-6 d-flex justify-content-end">
                            <Link to="/dashboard">
                                <button type="button" className="btn btn-outline-info mr-3">Cancel</button>
                            </Link>
                            {
                                GarbaseValue == '' ?
                                    <button type="submit" className="btn btn-outline-info">Save</button>
                                :
                                    <button type="submit" className="btn btn-outline-info" disabled>Save</button>
                            }
                            
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>Owner</h6>  
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control clear" htmlautocomplete="off" name="Owner" value={Owner} onChange={(e) => setOwner(e.target.value)} />
                            <p className="errormessage">{OwnerError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>Address</h6>
                        </div>
                        <div className="col-md-8">
                            <textarea type="text" className="form-control clear" htmlautocomplete="off" name="Address" value={Address} onChange={(e) => setAddress(e.target.value)}/>
                            <p className="errormessage">{AddressError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>APPRAISED VALUE</h6>
                        </div>
                        <div className="col-md-8">
                            <CurrencyInput type="text" className="form-control" min={0} name="AppraisedValue" htmlautocomplete="off" placeholder="$" onChange={(e) => setAppraisedValue(e.target.value)} prefix="$"/>
                            <p className="errormessage">{AppraisedValueError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>APPRAISED DATE</h6>
                        </div>
                        <div className="col-md-8">
                            <input type="date" date='MM-dd-yyyy' className="form-control" htmlautocomplete="off" placeholder="" name="AppraisedDate" data-date="" value={AppraisedDate} onChange={(e) => setAppraisedDate(e.target.value)} />
                            <p className="errormessage">{AppraisedDateError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>BANK / LENDER</h6>
                        </div>
                        <div className="col-md-8">
                            <input type="text" className="form-control" htmlautocomplete="off" name="Bank" value={Bank} onChange={(e) => setBank(e.target.value)} />
                            <p className="errormessage">{BankError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>STARTING PRINCIPLE</h6>
                        </div>
                        <div className="col-md-8">
                            <CurrencyInput type="text" className="form-control" htmlautocomplete="off" name="StartingPrinciple" placeholder="$"  onChange={(e) => setStartingPrinciple(e.target.value)} prefix="$"/>
                            <p className="errormessage">{StartingPrincipleError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>LOAN ORIGINATION <br/>DATE</h6>
                        </div>
                        <div className="col-md-8">
                            <input type="date" date='MM-dd-yyyy' className="form-control" htmlautocomplete="off" placeholder="" name="Loan" value={Loan} onChange={(e) => setLoan(e.target.value)} />
                            <p className="errormessage">{LoanError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>MONTHLY AMOUNT <br /> DUE</h6>
                        </div>
                        <div className="col-md-8">
                            <CurrencyInput type="text" className="form-control" htmlautocomplete="off" placeholder="$" name="MonthlyAmount" onChange={(e) => setMonthlyAmount(e.target.value)} prefix="$"/>
                            <p className="errormessage">{MonthlyAmountError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>CURRENT BALANCE</h6>
                        </div>
                        <div className="col-md-8">
                            <CurrencyInput type="text" className="form-control" htmlautocomplete="off" placeholder="$" name="CurrentBalance" onChange={(e) => setCurrentBalance(e.target.value)} prefix="$"/>
                            <p className="errormessage">{CurrentBalanceError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>ESCROW BALANCE</h6>
                        </div>
                        <div className="col-md-8">
                            <CurrencyInput type="text" className="form-control" htmlautocomplete="off" placeholder="$" name="EscrowBalance" onChange={(e) => setEscrowBalance(e.target.value)} prefix="$"/>
                            <p className="errormessage">{EscrowBalanceError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>MATURITY DATE</h6>
                        </div>
                        <div className="col-md-8">
                            <input type="date" date='MM-dd-yyyy' className="form-control" htmlautocomplete="off" placeholder="" value={MaturityDate} name="MaturityDate" onChange={(e) => setMaturityDate(e.target.value)} />
                            <p className="errormessage">{MaturityDateError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>TERM LENGTH</h6>
                        </div>
                        <div className="col-md-8">
                            <input type="number" className="form-control" htmlautocomplete="off" placeholder="# of Years" name="TermLength" value={TermLength} onChange={(e) => setTermLength(e.target.value)} />
                            <p className="errormessage">{TermLengthError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>RATE %</h6>
                        </div>
                        <div className="col-md-8">
                            <CurrencyInput type="text" className="form-control" htmlautocomplete="off" placeholder="%" name="Rate" onChange={(e) => setRate(e.target.value)} suffix="%"/>
                            <p className="errormessage">{RateError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>RENEWAL OPTION</h6>
                        </div>  
                        <div className="col-md-2 mb-3">
                            <select className="form-control" onChange={RenewalEditorNot} name="RenewalSelect" value={RenewalSelect}>
                                <option value="">Select</option> 
                                <option value={1}>Yes</option>
                                <option value={2}>No</option>
                                <option value={3}>Automatic Renewal</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input type="date" date='MM-dd-yyyy' className="form-control" placeholder="" htmlautocomplete="off" name="RenewalDate" ref={inputOne}  value={RenewalDate} onChange={(e) => setRenewalDate(e.target.value)} />
                            <p className="errormessage">{RenewalDateError}</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" htmlautocomplete="off" placeholder="Renewal terms" name="RenewalTerms" ref={inputTwo} value={RenewalTerms} onChange={(e) => setRenewalTerms(e.target.value)} />
                            <p className="errormessage">{RenewalTermsError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>INTEREST ONLY TERM</h6>
                        </div>
                        <div className="col-md-2 mb-3">
                             <select className="form-control" onChange={InterestTermEditorNot} name="InterestTermsEndDateSelect" value={InterestTermsEndDateSelect}>
                                <option value="">Select</option>
                                <option value={1}>Yes</option>
                                <option value={2}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <input type="date" date='MM-dd-yyyy' className="form-control" htmlautocomplete="off" name="InterestTermsEndDate" placeholder="Term End Date" ref={inputThree} value={InterestTermsEndDate} onChange={(e) => setInterestTermsEndDate(e.target.value)} />
                            <p className="errormessage">{InterestTermsEndDateError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3 ">
                            <h6>RATE CHANGE</h6>
                        </div>
                        <div className="col-md-2 mb-3">
                            <select className="form-control" onChange={RateChangeEditorNot} name="RateSelect" value={RateSelect}>
                                <option value="">Select</option>
                                <option value={1}>Yes</option>
                                <option value={2}>No</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input type="date" date='MM-dd-yyyy' className="form-control" placeholder="" htmlautocomplete="off" name="RateDate" ref={inputFive} onChange={(e) => setRateChangeDate(e.target.value)} />
                            <p className="errormessage">{RateChangeDateError}</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Comment" htmlautocomplete="off" name="RateComment" ref={inputFour}  onChange={(e) => setRateChangeComment(e.target.value)} />
                            <p className="errormessage">{RateChangeCommentError}</p>
                        </div>
                        {/* <div className="col-md-1">
                            <button type="button" className="btn btn-outline-primary" ref={inputSix} onClick={() => addFormFields(0)}>Add</button>
                        </div> */}
                    </div><br />
                    
                    <div className="row customForm">
                        <div className="col-md-3">
                            <h6>PRE-PAYPMENT <br /> PENALTIES SCHEDULE</h6>
                        </div>
                        <div className="col-md-2 mb-3">
                             <select className="form-control" onChange={PrepaymentPenaltiesEditorNot} name="PrePaymentSelect" value={PrePeymentSelect}>
                                <option value="">Select</option>
                                <option value={1}>Yes</option>
                                <option value={2}>No</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            {/* <input type="date" date='MM-dd-yyyy' name="PrePaymentDate" className="form-control" htmlautocomplete="off" placeholder="" ref={inputSeven} value={PrePeymentPenaltiesDate} onChange={(e) => setPrePeymentPenaltiesDate(e.target.value)} /> */}
                            <select className="form-control" name="PrePaymentDate" ref={inputSeven} value={PrePeymentPenaltiesDate} onChange={(e) => setPrePeymentPenaltiesDate(e.target.value)}>
                                <option value="">Select</option>
                                <option value="1 year">1 Year</option>
                                <option value="2 year">2 Year</option>
                                <option value="3 year">3 Year</option>
                                <option value="4 year">4 Year</option>
                                <option value="5 year">5 Year</option>
                            </select>
                            <p className="errormessage">{PrePeymentPenaltiesDateError}</p>
                        </div>
                        <div className="col-md-2">
                            <CurrencyInput type="text" name="PrePaymentPenlty" className="form-control" htmlautocomplete="off" placeholder="Penalty %" ref={inputEight} suffix="%" onChange={(e) => setPrePeymentPenaltiesPenlty(e.target.value)} />
                            <p className="errormessage">{PrePeymentPenaltiesPenltyError}</p>
                        </div>
                        <div className="col-md-1">
                            <button type="button" className="btn btn-outline-primary" ref={inputNine} onClick={() => addFormFieldsprepayment(0)}>Add</button>
                        </div>
                    </div>

                    {PrePeymentPenalties.map((prepayment, index) => (
                        <>
                        {PreTest ?
                        <div className="row" key={index}>
                            <div className="col-md-3">
                                <h6 style={{display:"none"}}>RATE CHANGE</h6>
                            </div>
                            <div className="col-md-2">
                                <select className="form-control" onChange={RateChangeEditorNot} style={{display:"none"}}>
                                    <option>Select</option>
                                    <option value={1}>Yes</option>
                                    <option value={2}>No</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                {/* <input type="date" date='MM-dd-yyyy' className="form-control" htmlautocomplete="off" name="PrePaymentDates[]" placeholder="" /> */}
                                <select className="form-control" name="PrePaymentDates[]">
                                    <option value="">Select</option>
                                    <option value="1 year">1 Year</option>
                                    <option value="2 year">2 Year</option>
                                    <option value="3 year">3 Year</option>
                                    <option value="4 year">4 Year</option>
                                    <option value="5 year">5 Year</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <CurrencyInput type="text" className="form-control" htmlautocomplete="off" name="PrePaymentPenltys[]" placeholder="Penalty %" suffix="%"/>
                            </div>
                            <div className="col-md-1">
                                <button type="button" className="btn btn-outline-danger" onClick={() => removeFormFieldsprepayment(index)}>Remove</button>
                            </div>
                        </div> :''}
                        <br />
                        </>
                    ))}       

                    <div className="row">
                        <div className="col-md-3">
                            <h6>PRE-PAYPMENT <br/> PENALTIES END DATE</h6>
                        </div>
                        <div className="col-md-8">
                            <input type="date" date='MM-dd-yyyy' ref={inputSix} className="form-control" htmlautocomplete="off" value={PrePeymentPenaltyEndDate} name="PrePeymentPenaltyEndDate" onChange={(e) => setPrePeymentPenaltyEndDate(e.target.value)} />
                            <p className="errormessage">{PrePeymentPenaltyEndDateError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>YIELD MAINTENANCE</h6>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" value={YieldMantenance} name="YieldMantenance" onChange={(e) => setYieldMantenance(e.target.value)} >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <p className="errormessage">{YieldMantenanceError}</p>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>PRIOR NOTICE TO <br />MATURITY</h6>
                        </div>
                        <div className="col-md-8">
                            <input type="number" className="form-control" htmlautocomplete="off" name="PriorNotice" placeholder="Number of Days" value={PriorNotice} onChange={(e) => setPriorNotice(e.target.value)} />
                            <p className="errormessage">{PriorNoticeError}</p>
                        </div>
                    </div>
                    <br />
                  </form>
                </div>
            {/* </div> */}
        {/*  </div> */}
    </>
);

}
export default Propertiescreate;