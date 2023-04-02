<script>
	let author = '';
	let result = '';
	
	async function doPost () {
		const res = await fetch('../api/authors/', {
			method: 'POST',
			body: JSON.stringify({
				author,
			})
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
	}
</script>


<input bind:value={author} />
<button type="button" on:click={doPost}>
	Enregistrer
</button>
<p>
	Result:
</p>
<pre>
{result}
</pre>