import {fetchTutorials} from "../../actions/tutorialsActions";
import {connect} from "react-redux";
import Tutorials from "./Tutorials";

const mapStateToProps = (state) => ({
    tutorials: state.root.tutorials,
    errorMessage: state.root.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
    loadTutorials() {
        dispatch(fetchTutorials())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tutorials);
