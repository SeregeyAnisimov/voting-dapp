// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/**
 * @title VotingService
 * @dev Простой контракт для голосования "за" и "против"
 */
contract VotingService {
    // --- Структуры ---
    struct Voter {
        uint vote; // 1 - против, 2 - за, 0 - не голосовал
        bool voted; // Флаг, чтобы проверить, голосовал ли пользователь
    }

    // --- Состояния голосования ---
    enum VoteStatus { Active, Finished }

    // --- Статические переменные ---
    string public voteQuestion;
    uint public numberOfVotesToFinish; // Порог голосов для завершения
    address public owner; // Владелец контракта

    // --- Динамические переменные ---
    mapping(address => Voter) public voters;
    address[] public voterAddresses;
    uint public countVotesFor; 
    uint public countVotesAgainst; 
    VoteStatus public status; 

    // --- Модификаторы ---
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyActive() {
        require(status == VoteStatus.Active, "Voting is not active.");
        _;
    }

    modifier onlyVoter() {
        // Пока что разрешаем голосовать всем
        _;
    }

    // --- События ---
    event Voted(address indexed voter, uint voteValue);
    event VotingFinished(string question, uint votesFor, uint votesAgainst);

    // --- Конструктор ---
    constructor(string memory question, uint numVotesToFinish) {
        voteQuestion = question;
        numberOfVotesToFinish = numVotesToFinish;
        owner = msg.sender;
        status = VoteStatus.Active;
        countVotesFor = 0;
        countVotesAgainst = 0;
    }

    // --- Функции ---
    /**
     * @dev Возвращает вопрос голосования
     */
    function showVoteQuestion() public view returns (string memory) {
        return voteQuestion;
    }

    /**
     * @dev Возвращает правила голосования
     */
    function showVoteRules() public pure returns (string memory) {
        return "Vote 1: Against, Vote 2: For. Each address can vote only once.";
    }

    /**
     * @dev Голосовать "за"
     */
    function voteFor() public onlyActive onlyVoter {
        _saveVote(2); // 2 означает "за"
    }

    /**
     * @dev Голосовать "против"
     */
    function voteAgainst() public onlyActive onlyVoter {
        _saveVote(1); // 1 означает "против"
    }

    /**
     * @dev Внутренняя функция для сохранения голоса
     * @param voteValue 1 - против, 2 - за
     */
    function _saveVote(uint voteValue) internal {
        require(!voters[msg.sender].voted, "Sorry, you have already voted.");

        voters[msg.sender] = Voter(voteValue, true); // Устанавливаем голос и флаг
        voterAddresses.push(msg.sender); // Добавляем адрес в историю

        if (voteValue == 2) {
            countVotesFor++;
        } else if (voteValue == 1) {
            countVotesAgainst++;
        }

        emit Voted(msg.sender, voteValue); // Вызываем событие

        // Проверяем, достигнут ли порог для завершения голосования
        if (voterAddresses.length >= numberOfVotesToFinish) {
            status = VoteStatus.Finished;
            emit VotingFinished(voteQuestion, countVotesFor, countVotesAgainst);
        }
    }

    /**
     * @dev Подсчитывает и возвращает текущие результаты голосования
     * @return votesFor Количество голосов "за"
     * @return votesAgainst Количество голосов "против"
     */
    function countVotes() public view returns(uint votesFor, uint votesAgainst) {
        votesFor = countVotesFor;
        votesAgainst = countVotesAgainst;
    }

    /**
     * @dev Возвращает статус голосования
     */
    function getVotingStatus() public view returns (string memory) {
        if (status == VoteStatus.Active) {
            return "Active";
        } else {
            return "Finished";
        }
    }

    /**
     * @dev Функция, которую может вызвать владелец для принудительного завершения голосования
     */
    function finishVoting() public onlyOwner {
        require(status == VoteStatus.Active, "Voting is already finished.");
        status = VoteStatus.Finished;
        emit VotingFinished(voteQuestion, countVotesFor, countVotesAgainst);
    }

    /**
     * @dev Возвращает количество проголосовавших
     */
    function voterCount() public view returns(uint) {
        return voterAddresses.length;
    }

    function getVoterAtIndex(uint index) public view returns(address voter, uint vote, bool hasVoted) {
        require(index < voterAddresses.length, "Index out of bounds.");
        address addr = voterAddresses[index];
        Voter memory v = voters[addr];
        return (addr, v.vote, v.voted);
    }
}