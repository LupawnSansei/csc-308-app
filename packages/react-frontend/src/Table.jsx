// src/Table.jsx
function TableHeader() {
    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Id</th>
            <th>Remove</th>
        </tr>
        </thead>
    );
}

function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
            const rowId = row._id ?? row.id;
            return (
                <tr key={rowId ?? index}>
                    <td>{row.name}</td>
                    <td>{row.job}</td>
                    <td>{rowId}</td>
                    <td>
                        <button onClick={() => props.removeCharacter(index, rowId)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        }
    );
    return (
        <tbody>
        {rows}
        </tbody>
    );

}

function Table(props) {
    return (
        <table>
            <TableHeader />
            <TableBody
                characterData={props.characterData}
                removeCharacter={props.removeCharacter}
            />
        </table>
    );
}
export default Table;
