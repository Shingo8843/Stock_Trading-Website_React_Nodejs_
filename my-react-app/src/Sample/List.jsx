import PropTypes from "prop-types";
function List(props) {
  //   const fruits = [
  //     { id: 1, name: "Apple", calories: 95 },
  //     { id: 3, name: "Cherry", calories: 77 },
  //     { id: 2, name: "Banana", calories: 105 },
  //   ];
  const fruits = props.items;
  //   fruits.sort((a, b) => a.name.localeCompare(b.name)); //alphabetically
  //   fruits.sort((a, b) => b.name.localeCompare(a.name)); //reverse alphabetically
  fruits.sort((a, b) => a.calories - b.calories); //calories low to high
  //   LowCalFruits = fruits.filter((fruit) => fruit.calories < 100);
  const ListItems = fruits.map((fruit) => (
    <li key={fruit.id}>
      {fruit.name} : &nbsp; <b>{fruit.calories}</b>
    </li>
  ));
  return (
    <>
      <h3>{props.categories}</h3>
      <ul>{ListItems}</ul>
    </>
  );
}
export default List;
