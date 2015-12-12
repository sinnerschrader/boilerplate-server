export default async function failingTask() {
	throw new Error('This task is intended to fail');
}
