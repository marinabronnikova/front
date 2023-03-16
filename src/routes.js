import Index from "views/Index.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import OrganizationTable from "views/examples/OrganizationTable"
import OrganizationDetail from "views/examples/OrganizationDetails"
import OrganizationAdding from "views/examples/OrganizationAdding"
import InvoiceDetails from "views/examples/InvoiceDetail"
import InvoiceAdding from "views/examples/InvoiceAdd"
import InvoiceReview from "views/examples/InvoiceReview"
import InvoiceReviewDetails from "views/examples/InvoiceReviewDetails"
import Inviting from "views/examples/InviteStaff"
import ProductsList from "views/examples/ProductsTable"
import ProductDetail from "views/examples/ProductDetails"
import ProductCreatingForm from "views/examples/ProductCreation"
import CompanyDetail from "views/examples/CompanyDetails"



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Invoices",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/invoices-review",
    name: "Invoice review",
    icon: "ni ni-credit-card text-red",
    component: InvoiceReview,
    layout: "/admin",
  },
  {
    path: "/invoice-review/:id",
    name: "Invoice review",
    icon: "ni ni-bullet-list-67 text-red",
    component: InvoiceReviewDetails,
    layout: "/admin",
    hide: true
  },
  
  {
    path: "/invite-staff",
    name: "Invitate",
    icon: "ni ni-badge",
    component: Inviting,
    layout: "/admin",
  },
  {
    path: "/invoices/:id",
    name: "Invoices",
    icon: "ni ni-bullet-list-67 text-red",
    component: InvoiceDetails,
    layout: "/admin",
    hide: true
  },

  {
    path: "/invoice-add",
    name: "Invoice",
    icon: "ni ni-bullet-list-67 text-red",
    component:   InvoiceAdding,
    layout: "/admin",
    hide: true
  },
  {
    path: "/organization-add",
    name: "OrganizationAdd",
    icon: "ni ni-building",
    component: OrganizationAdding,
    layout: "/admin",
    hide: true
  },
  {
    path: "/organizations/:id",
    name: "OrganizationsDetails",
    icon: "ni ni-building",
    component: OrganizationDetail,
    layout: "/admin",
    hide: true
  },

  {
    path: "/organizations",
    name: "Organizations",
    icon: "ni ni-building",
    component: OrganizationTable,
    layout: "/admin"
  },
  {
    path: "/products/:id",
    name: "Products",
    icon: "ni ni-delivery-fast text-info",
    component: ProductDetail,
    layout: "/admin",
    hide: true
  },
  {
    path: "/product-add",
    name: "Products",
    icon: "ni ni-delivery-fast text-info",
    component: ProductCreatingForm,
    layout: "/admin",
    hide: true
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-delivery-fast text-info",
    component: ProductsList,
    layout: "/admin"
  },
  {
    path: "/company",
    name: "Company",
    icon: "ni ni-diamond text-warning",
    component: CompanyDetail,
    layout: "/admin"
  },
  
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    hide: true
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    hide: true
  }
];
export default routes;
