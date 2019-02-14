
/* state machine class */

function StateMachine(states) {


    this.states = states;
    this.currentState;

    this.change = function (state, params) {
        this.currentState = this.states[state];
        this.currentState.enter(params);
    }

    this.update = function(params){
        this.currentState.update(params);
    }

    this.draw = function() {
        this.currentState.draw();
    }
}

export default StateMachine;