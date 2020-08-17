// status: 
// 0: not answered
// 1: accepted
// 2: failed

const ListQuestion = [
    {
        id: 1,
        question: "Do something about this",
        type: "programming",
        status: 1,
    },
    {
        id: 2,
        question: "Do something about this",
        type: "programming",
        status: 0,
    }, {
        id: 3,
        question: "Do something about this",
        type: "programming",
        status: 2,
    }, {
        id: 4,
        question: "Do something about this",
        type: "programming",
        status: 0,
    }
]


const getPercent = () => {
    const Answered = ListQuestion.filter(item => item.status != 0);
    return Answered.length / ListQuestion.length
}

const getQuestion = (number) => {
    if (number == "all") return ListQuestion;
    return ListQuestion.filter(item => item.id == number)
}

const renderQuestion = (Question, num) => {

    $(`
        <li class="main__content--right--questions--list--item" >
            <div class="main__content--right--questions--list--item--content row a-center">
                <div class="col-xs-6 flex a-center">
                    <div class="num-question">
                        Q${num}
                    </div>
                    <div class="question-content">
                        <a href="">${Question.question}</a>
                    </div>
                </div>
                <div class="col-xs-2 type">
                    ${Question.type}
                </div>
                    ${Question.status == 0 ?
            "<div class='col-xs-2'>Not Answered</div>"
            :
            Question.status == 1 ?
                "<div class='col-xs-2 accept'><i class='fas fa-check'></i><span>Accept</span></div>"
                :
                "<div class='col-xs-2 fail'><i class='fas fa-times'></i><span>Accept</span></div>"
        }
                <div class="col-xs-2">
                    <div class="solve">
                       ${Question.status == 0 ? "Solve Question" : "View results"}
                    </div>
                </div>
            </div>
            <div class="line col-xs-12"></div>
        </li>
    
    `).appendTo('.main__content--right--questions--list');
}


const renderListQuestion = (list, num) => {
    const filter = getQuestion(num)
    $('.main__content--right--questions--list').empty();
    if (!filter.length) return filter
    filter.map((q, index) => {
        renderQuestion(q, num == "all" ? index + 1 : num)
    })
    $('.header__nav--process--bar--done').css('width', `${getPercent() * 100}%`)
}

$('.main__content--left-sidebar--bars').click(function (e) {
    e.preventDefault();
    $('.main__content--left-sidebar--list--item').removeClass('active');
    $(this).addClass('active')
    renderListQuestion(ListQuestion, "all")
});

$(document).on('click', '.main__content--left-sidebar--list--item', function (e) {
    $('.main__content--left-sidebar--list--item').removeClass('active');
    $('.main__content--left-sidebar--bars').removeClass('active');
    $(this).addClass('active')

    const numQuestion = $(this).attr('value').split('-')[1];
    renderListQuestion(ListQuestion, numQuestion)
});


// first
renderListQuestion(ListQuestion, "all")
