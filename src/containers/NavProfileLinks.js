import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";

function NavProfileLinks() {
    const dispatch = useDispatch();

    const openLoginModal = () => {
        dispatch(openModal({ 
            title: "", 
            size: "lg", 
            bodyType: MODAL_BODY_TYPES.SIGN_IN_MODAL, 
            extraObject: { isSignIn: true } 
        }));
    };

    return (
        <button 
            className="btn btn-sm text-xs normal-case hover:bg-primary btn-outline" 
            onClick={openLoginModal}
        >
            Sign In
        </button>
    );
}

export default NavProfileLinks;