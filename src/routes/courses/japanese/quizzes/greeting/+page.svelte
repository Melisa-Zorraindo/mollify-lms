<script lang="ts">
	type Question = {
		q: string;
		o: AnswerOption;
		a: string;
	};

	type AnswerOption = {
		a: string;
		b: string;
		c: string;
	};
	const questions: Question[] = [
		{
			q: 'What are the three writing scripts used in Japanese?',
			o: {
				a: 'Hiragana, Katakana, and Romaji',
				b: 'Kanji, Kana, and Romaji',
				c: 'Kanji, Hiragana, and Katakana'
			},
			a: 'Kanji, Hiragana, and Katakana'
		},
		{
			q: 'What is the difference between Hiragana and Katakana?',
			o: {
				a: 'Hiragana is used for foreign loanwords, while Katakana is used for Japanese words.',
				b: 'Hiragana is used for informal writing, while Katakana is used for formal writing.',
				c: 'Hiragana is used for Japanese words, while Katakana is used for foreign loanwords and emphasis.'
			},
			a: 'Hiragana is used for Japanese words, while Katakana is used for foreign loanwords and emphasis.'
		},
		{
			q: 'How many kanji characters are there in the official jōyō kanji list?',
			o: {
				a: '2136',
				b: '2200',
				c: '2390'
			},
			a: '2136'
		},
		{
			q: 'What is the purpose of furigana?',
			o: {
				a: 'To indicate the meaning of a kanji character.',
				b: 'To indicate the pronunciation of a kanji character.',
				c: 'To indicate the stroke order of a kanji character.'
			},
			a: 'To indicate the pronunciation of a kanji character.'
		},
		{
			q: 'Which of the three writing scripts is used most commonly in modern Japanese?',
			o: {
				a: 'Kanji',
				b: 'Hiragana',
				c: 'Katakana'
			},
			a: 'Hiragana'
		}
	];

	function getScore(e: Event): void {
		e.preventDefault();
		let score: number = 0;
		for (let i = 0; i < questions.length; i++) {
			const selectedOption = document.querySelector(
				`input[name=option_${i}]:checked`
			) as HTMLInputElement;
			if (selectedOption.value === questions[i].a) {
				score++;
			}
		}
		alert(`Your score is ${score}/${questions.length}`);
	}
</script>

<main>
	<h1>Greeting in Japanese quiz</h1>
	<form on:submit={getScore}>
		{#each questions as question, i}
			<div class="question-box">
				<p>{question.q}</p>

				<div class="possible-answers">
					<input
						type="radio"
						name={`option_${i}`}
						id={`option_${i}_a`}
						value={question.o.a}
						required
					/>
					<label for={`option_${i}_a`}>{question.o.a}</label>
				</div>
				<div class="possible-answers">
					<input
						type="radio"
						name={`option_${i}`}
						id={`option_${i}_b`}
						value={question.o.b}
						required
					/>
					<label for={`option_${i}_b`}>{question.o.b}</label>
				</div>

				<div class="possible-answers">
					<input
						type="radio"
						name={`option_${i}`}
						id={`option_${i}_c`}
						value={question.o.c}
						required
					/>
					<label for={`option_${i}_c`}>{question.o.c}</label>
				</div>
			</div>
		{/each}
		<button>Send</button>
	</form>
</main>

<style>
	.question-box {
		margin: 2rem 0;
		padding: 0 0 2rem;
		border-bottom: 1px solid grey;
	}

	.possible-answers {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0.5rem 0;
	}

	.possible-answers label,
	.possible-answers input {
		cursor: pointer;
	}

	button {
		background-color: aqua;
		padding: 0.5rem 3rem;
		border: none;
		cursor: pointer;
	}
</style>
