import React, {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from "react";

type LinkReqContextType = {
    username: { [key: string]: any } | null;
    setUsername: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
    address: { [key: string]: any } | null;
    setAddress: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
    amount: { [key: string]: any } | null;
    setAmount: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
    token: { [key: string]: any } | null;
    setToken: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};

const LinkReqContext = createContext<LinkReqContextType | undefined>(undefined);

function useLinkReq(): LinkReqContextType {
    const context = useContext(LinkReqContext);
    if (!context) {
        throw new Error("useLinkReq must be used within an LinKReqProvider");
    }
    return context;
}

const LinkReqProvider = (props: { children: ReactNode }): ReactElement => {
    const [username, setUsername] = useState<{ [key: string]: any } | null>(null);
    const [address, setAddress] = useState<{ [key: string]: any } | null>(null);
    const [amount, setAmount] = useState<{ [key: string]: any } | null>(null);
    const [token, setToken] = useState<{ [key: string]: any } | null>(null);

    return <LinkReqContext.Provider {...props} value={{ 
        username, setUsername,
        address, setAddress,
        amount, setAmount,
        token, setToken,
    }} />;
};

export { LinkReqProvider, useLinkReq };