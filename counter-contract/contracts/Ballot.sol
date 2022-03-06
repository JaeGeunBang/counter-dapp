pragma solidity >=0.4.22 <0.9.0;

contract Ballot {
    struct Voter {
        uint weight ;
        bool voted ;
        uint vote;
    }
    struct Proposal {
        uint voteCount ;
    }
    address chairperson ;
    mapping(address => Voter) voters;
    Proposal[] proposals ;

    modifier onlyChair() {
        require(msg.sender == chairperson);
        _;
    }

    modifier validVoter() {
        require(voters[msg.sender].weight > 0, "Not a Registered Voter") ;
        _;
    }

    constructor(uint numProposals) public {}
    function register(address voter) public onlyChair {}
    function vote (uint toProposal) public validVoter {}
    function reqWinner() public view returns (uint winningProposal) {}
}