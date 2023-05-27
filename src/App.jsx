import React from 'react';
import {
  BrowserRouter as Router,Routes,
  Route,
  
} from 'react-router-dom';

import Contact from './Component/Contact';
import Portfolio from './Component/Portfolio';
import Home from './Component/Home';
import Pricing from './Component/Pricing';
import Tutorial from './Component/Tutorial';
import Navbarr from './Component/Navbarr';
import Register from './Component/Register';
import SignupForm from './Component/SignupForm';
import LoginSignupTabs from './Component/LoginSignupTabs';
import CustomDesign from './Component/CustomDesign';
import options_design from './Component/options_design';
import Footer from './Component/Footer';
import ForgotPassword from './Component/ForgotPassword';
import Parameter from './Component/Parameter';
import Feedback from './Component/Feedback';
import Payment from './Component/Payment';
import Thankyou from './Component/Thankyou';
import Fetch from './Component/Fetch';
import Faq from './Component/Faq';
// import Dashboard from './Component/Dashboard';
import Admin from './Component/Admin';
import settings from   './Component/settings';
import UsernameSettings from './Component/UsernameSettings';
import PasswordSettings from './Component/PasswordSettings';
import LanguageSettings from './Component/LanguageSettings';
import ColorSettings from './Component/ColorSettings';
import Designerpage from  './Component/Designerpage';
import support from  './Component/support';
import  privcypolicy from  './Component/privcypolicy';
import help from  './Component/help';
import TermsofUse from  './Component/TermsofUse';


const App = () => {
  return (
   <Router>
    <Navbarr/>
   
    <main>
      <Routes>
        <Route path="/home"  Component={Home}/>
          
        <Route path="/portfolio"  Component={Portfolio}/>
        <Route path="/Faq"  Component={Faq}/>
        <Route path="/pricing"  Component={Pricing}/>
         
        <Route path="/tutorial"  Component={Tutorial}/>
        <Route path="/Thankyou"  Component={Thankyou}/>
        <Route path="/contact"  Component={Contact}/>
        
        <Route path="/register"  Component={Register}/>
        <Route path="/signupform"  Component={SignupForm}/>
        <Route path="/loginsignuptabs"  Component={LoginSignupTabs}/>

        <Route path="/"  Component={CustomDesign}/>
        <Route path="/options_design"  Component={options_design}/>
        <Route path="/footer"  Component={Footer}/>
        <Route path="/forgotpassword"  Component={ForgotPassword}/>
        <Route path="/parameter"  Component={Parameter}/>
        <Route path="/feedback"  Component={Feedback}/>
        <Route path="/payment"  Component={Payment}/>
        <Route path="/fetch"  Component={Fetch}/>
        {/* <Route path="/dashboard"  Component={Dashboard}/> */}
        <Route path="/admin"  Component={Admin}/>
        <Route path="/settings"  Component={settings}/>
        <Route path="/usernamesettings"  Component={UsernameSettings}/>
        <Route path="/passwordsettings "  Component={PasswordSettings}/>
        <Route path="/languagesettings"  Component={LanguageSettings}/>
        <Route path="/colorsetting"  Component={ColorSettings}/>
        <Route path="/privcypolicy"  Component={privcypolicy}/>
        <Route path="/help"  Component={help}/>
        <Route path="/support"  Component={support}/>
        <Route path="/TermsofUse"  Component={TermsofUse}/>


       
      </Routes>
    </main>
    <Footer/>
   </Router>
  );
}

export default App;
