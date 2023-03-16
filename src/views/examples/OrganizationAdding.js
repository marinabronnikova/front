import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    API_URL_ORGANIZATION_LIST,
} from "../../api/Urls";
import OrganizationForm  from './OrganizationForm'
import { useParams } from "react-router-dom";

const OrganizationAdding = () => {
    const [organization, setOrganization] = useState({});
  
    return (    
        <OrganizationForm organizationData={{}} bankData={{}}/>
    );
  };
  
  export default OrganizationAdding;
  