import {fetchTutorials} from "../../actions/tutorialsActions";
import {connect} from "react-redux";
import Tutorials from "./Tutorials";

const mapStateToProps = (state) => ({
    tutorials: state.tutorials,
});

const mapDispatchToProps = (dispatch) => ({
    loadTutorials() {
        dispatch(fetchTutorials('aaa'))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tutorials);
