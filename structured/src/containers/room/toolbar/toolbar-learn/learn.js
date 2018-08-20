import React  from 'react';
import { Button } from "reactstrap";
import Modal from "../../../../components/user-interface/modal/modal";

const learn = (props) => (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <div />
        <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group">
                <Button outline color="info" className="mr-2" onClick={() => props.randomGraph()}><i className="fas fa-code-branch"></i> Random graph</Button>
                <Modal title="What are graphs?" buttonCondition buttonLabel="What are graphs?" buttonClass="btn btn-outline-secondary">
                    {props.graphLearn('GRAPH_LEARN_GRAPHS')}
                </Modal>
                <Modal title="Different representations" buttonCondition buttonLabel="Different representations" buttonClass="btn btn-outline-secondary">
                    {props.graphLearn('GRAPH_LEARN_REPRESENTATIONS')}
                </Modal>
                <Modal title="Graph traversals" buttonCondition buttonLabel="Graph traversals" buttonClass="btn btn-outline-secondary">
                    {props.graphLearn('GRAPH_LEARN_TRAVERSALS')}
                </Modal>
            </div>
        </div>
    </div>
);

export default learn;