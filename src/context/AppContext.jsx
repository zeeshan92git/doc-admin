import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const ageCalculator = (dob) => {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };
    const currency = '$';
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
    }

    const value = {
        ageCalculator , dateFormat , currency
    }

    return (
        <AppContext value={value}>
            {props.children}
        </AppContext>
    )
};

export default AppContextProvider;

