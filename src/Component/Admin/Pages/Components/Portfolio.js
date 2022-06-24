import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import jsPDF  from "jspdf";
// import MaterialTable from "material-table";

const Portfolio = () => {

  const [Property, setProperty] = React.useState([]);

  const [Search, setSearch] = React.useState('');

  const [Type, setType] = React.useState('true');

  const columns = [
    {title:"Property", field:"address"},
    {title:"Owner", field:"owner"},
    {title:"Appraised Val", field:"appraised_value"},
    {title:"Appraised Date", field:"appraised_date"},
    {title:"Lender", field:"bank"},
    {title:"Starting Principle", field:"starting_principle"},
    {title:"Loan Origination Date", field:"loan"},
    {title:"Monthly Amount Due", field:"monthly_amount_due"},
    {title:"Current bal", field:"current_bal"},
    {title:"Escrow bal", field:"escrow_bal"},
    {title:"Maturity Date", field:"maturity_date"},
    {title:"Term Length", field:"term_leng"},
    {title:"Rate", field:"rate"},
    {title:"Interest Only Term", field:"interest_only_term"},
    {title:"Renewal Date", field:"renewal_date"},
    {title:"Renewal Term", field:"renewal_term"},
    {title:"Ratechange Date", field:"rate_date"},
    {title:"Ratechange comment", field:"rate_comment"},
    {title:"Prepayment Date & Penalty", field:"prepayment_date_penalty"},
    {title:"Pre-paypment Penalties End Date", field:"pre_paypment_penalties_end_date"},
    {title:"Yield Maintenance", field:"yield_maintenance"},
    {title:"Prior Notice", field:"prior_notice"}]

    const downloadExcel = () => {

    }
// ======================================================= Change url for API ===============================================
  var answer = window.location.href;
  const answer_array = answer.split("/");

  React.useEffect(() => {

    const userId = localStorage.getItem('userId');

    if (answer_array[2] == "localhost:3000") {
        var Properties = `http://localhost:8000/api/property/${userId}`;
    }else{
        var Properties = `https://realestatesbackend.ajcnctools.com/api/property/${userId}`
    }

    fetch(Properties)
      .then((res) => res.json())  
      .then((json) => {
        setProperty(json);
      });

  },[]);

  // ================================================= Start for sorting ====================================================

  const Sorting =(name) =>
  {
    var typename = name;

    const userId = localStorage.getItem('userId');
    
    setType(!Type)

    if (answer_array[2] == "localhost:3000") {
        var Properties = `http://localhost:8000/api/sorting/${typename}/${Type}/${userId}`;
    }else{
        var Properties = `https://realestatesbackend.ajcnctools.com/api/sorting/${typename}/${Type}/${userId}`
    }

    fetch(Properties)
      .then((res) => res.json())
      .then((json) => { 
        setProperty(json);
      });
      
  }
  
  // For Print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // For download pdf
  const pfddownload = ()=>
  {
      const input = document.getElementById("pdf-element");
      const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
      pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
          pdf.save("test.pdf");
      });
  }

// ==================================================== Start return  ======================================================
  return (
    <>
      <div className="portfolio">
       

        <div>
          <div className="row earch mb-4">
            <div className=" col-xl-6 col-lg-11 col-md-11 col-11  mx-auto searched position-relative">
            <div className="mb-4 portTxt">
          <h2>PORTFOLIO DATABASE</h2>
          <p>View Important Events Regarding your Portfolio </p>
        </div>
              <i className="fa fa-search"></i>
              <input
                type="text"
                placeholder="Type to search..."
                id="searchbar"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className=" col-xl-6 col-lg-11 col-md-11 col-11 align-items-end mx-auto map">
              <h5 className="mr-4 mapTxt">MAP VIEW</h5>
              <div className="mr-4">
                <input type="checkbox" id="toggle" />
                <label for="toggle"></label>
              </div>
              <div className="position-absolute">
              <button className="btns mr-4">Upload</button>
              <button className="btns mr-4" onClick={pfddownload}>Download</button>
              <button className="btns" onClick={handlePrint}>Print</button>
              </div>
            </div>
          </div>
        </div>

        <div className="table" ref={componentRef} id="pdf-element">
          <div className="table-header">
            <div className="header__item ">Property <i class="fa fa-sort" onClick={() => Sorting('property')}></i></div>
            <div className="header__item ">Owner <i class="fa fa-sort" onClick={() => Sorting('owner')}></i></div>
            <div className="header__item ">Appraised Val <i class="fa fa-sort" onClick={() => Sorting('appr_val')}></i></div>
            <div className="header__item ">Appraised Date <i class="fa fa-sort" onClick={() => Sorting('appr_date')}></i></div>
            <div className="header__item ">Lender <i class="fa fa-sort" onClick={() => Sorting('lender')}></i></div>
            <div className="header__item ">Starting <br />    Principle <i class="fa fa-sort" onClick={() => Sorting('starting_principle')}></i></div>
            <div className="header__item ">Loan Origination Date <i class="fa fa-sort" onClick={() => Sorting('loan_origination_date')}></i></div>
            <div className="header__item ">Monthly Amount Due <i class="fa fa-sort" onClick={() => Sorting('monthly_amount_due')}></i></div>
            <div className="header__item ">Current bal <i class="fa fa-sort" onClick={() => Sorting('current_bal')}></i></div>
            <div className="header__item ">Escrow bal <i class="fa fa-sort" onClick={() => Sorting('escrow_bal')}></i></div>
            <div className="header__item ">Maturity Date <i class="fa fa-sort" onClick={() => Sorting('maturity_date')}></i></div>
            <div className="header__item ">Term Length <i class="fa fa-sort" onClick={() => Sorting('term_leng')}></i></div>
            <div className="header__item ">Rate <i class="fa fa-sort" onClick={() => Sorting('rate')}></i></div>
            <div className="header__item ">Interest Only <br />Term <i class="fa fa-sort" onClick={() => Sorting('interest_only_term')}></i></div>
            <div className="header__item ">Renewal Date <i class="fa fa-sort" onClick={() => Sorting('renewal_date')}></i></div>
            <div className="header__item ">Renewal Term <i class="fa fa-sort" onClick={() => Sorting('renewal_term')}></i></div>
            <div className="header__item ">Ratechange <br /> Date <i class="fa fa-sort" onClick={() => Sorting('ratechange_date')}></i></div>
            <div className="header__item ">Ratechange comment <i class="fa fa-sort" onClick={() => Sorting('ratechange_comment')}></i></div>
            <div className="header__item ">Prepayment Date & Penalty <i class="fa fa-sort" onClick={() => Sorting('prepaymentdate_penalty')}></i></div>
            <div className="header__item ">Pre-paypment Penalties End Date <i class="fa fa-sort" onClick={() => Sorting('pre_paypment_penalties_end_date')}></i></div>
            <div className="header__item ">Yield Maintenance <i class="fa fa-sort" onClick={() => Sorting('yield_maintenance')}></i></div>
            <div className="header__item ">Prior Notice <i class="fa fa-sort" onClick={() => Sorting('prior_notice')}></i></div>
          </div>
          <div className="table-content" id="portfoliodatabase">
            {
               Property.filter((val)=>{
                  if(Search == '')
                  {
                      return val
                  }else if(val.owner.toLowerCase().includes(Search.toLocaleLowerCase()) || 
                      val.address.toLowerCase().includes(Search.toLocaleLowerCase()) || 
                      val.appraised_value.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.appraised_date.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.bank.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.starting_principle.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.loan.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.monthly_amount_due.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.current_bal.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.escrow_bal.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.term_leng.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.rate.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.interest_only_term.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.pre_paypment_penalties_end_date.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.yield_maintenance.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.prior_notice.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.renewal_term.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.rate_date.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.rate_comment.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.prepayment_date_penalty.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.maturity_date.toLowerCase().includes(Search.toLocaleLowerCase()) ||
                      val.renewal_date.toLowerCase().includes(Search.toLocaleLowerCase()))
                  {
                    return val
                  }
               }).map(function(pro, index){
                return <div className="table-row">
                  <div className="table-data">{pro.address}</div>
                  <div className="table-data">{pro.owner}</div>
                  <div className="table-data">{pro.appraised_value}</div>
                  <div className="table-data">{pro.appraised_date}</div>
                  <div className="table-data">{pro.bank}</div>
                  <div className="table-data">{pro.starting_principle}</div>
                  <div className="table-data">{pro.loan}</div>
                  <div className="table-data">{pro.monthly_amount_due}</div>
                  <div className="table-data">{pro.current_bal}</div>
                  <div className="table-data">{pro.escrow_bal}</div>
                  <div className="table-data">{pro.maturity_date}</div>
                  <div className="table-data">{pro.term_leng}</div>
                  <div className="table-data">{pro.rate}</div>

                  {pro.interest_only_term != '' ?
                    <div className="table-data">{pro.interest_only_term}</div>:
                    <div className="table-data">-</div>
                  }

                  {pro.renewal_date != ''?
                    <div className="table-data">{pro.renewal_date}</div>:
                    <div className="table-data">-</div>
                  }
                  
                  {pro.renewal_term != ''?
                    <div className="table-data">{pro.renewal_term}</div>:
                    <div className="table-data">-</div>
                  }
                  
                  {pro.rate_date != ''?
                    <div className="table-data">{pro.rate_date}</div>:
                    <div className="table-data">-</div>
                  }
                  
                  {pro.rate_comment != ''?
                    <div className="table-data">{pro.rate_comment}</div>:
                    <div className="table-data">-</div>
                  }

                  {pro.prepayment_date_penalty != ''?
                    <div className="table-data">{pro.prepayment_date_penalty.split(',').map(str => <div>{str}</div>)}</div>:
                    <div className="table-data">-</div>
                  }
                  {/* <div className="table-data">{pro.prepayment_date_penalty}</div> */}

                  {pro.pre_paypment_penalties_end_date != ''?
                    <div className="table-data">{pro.pre_paypment_penalties_end_date}</div>:
                    <div className="table-data">-</div>
                  }
                  
                  <div className="table-data">{pro.yield_maintenance}</div>
                  <div className="table-data">{pro.prior_notice}</div>
                  
                </div>
                })
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

