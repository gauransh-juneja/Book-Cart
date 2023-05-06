import React, { useEffect, useState } from "react";
import "./CSS/category.css";
import categoryLogo from "./images/category.png";
import science from "./images/Categories/science.png";
import programming from "./images/Categories/programming.png";
import math from "./images/Categories/math.png";
import literature from "./images/Categories/literature.png";
import novel from "./images/Categories/novel.png";
import growth from "./images/Categories/growth.png";
import { NavLink, useParams } from "react-router-dom";
import { db } from "../firebase";

function Category({ books }) {
  const { catId } = useParams();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    db.collection("categories")
      .doc(catId)
      .get()
      .then((doc) => setCategory(doc.data()?.books));
  }, [catId]);

  console.log(category);

  const categoryImg = {
    science: science,
    programming: programming,
    mathematics: math,
    growth: growth,
    novel: novel,
    literature: literature,
  };

  return (
    <section className="bookWebPage">
      <h1 className="gradient_head">CATEGORIES</h1>
      <div className="boxAndLogo">
        <div id="book_category" className="books_box">
          <NavLink to="/category/science" className="books_category">
            <img src={science} alt="Science" />
            <p>Science</p>
          </NavLink>
          <NavLink to="/category/programming" className="books_category">
            <img src={programming} alt="Programming" />
            <p>Programming</p>
          </NavLink>
          <NavLink to="/category/mathematics" className="books_category">
            <img src={math} alt="Mathematics" />
            <p>Mathematics</p>
          </NavLink>
          <NavLink to="/category/growth" className="books_category">
            <img src={growth} alt="Growth" />
            <p>Growth</p>
          </NavLink>
          <NavLink to="/category/novel" className="books_category">
            <img src={novel} alt="Novel" />
            <p>Novel</p>
          </NavLink>
          <NavLink to="/category/literature" className="books_category">
            <img src={literature} alt="Literature" />
            <p>Literature</p>
          </NavLink>
        </div>
        <img
          src={categoryLogo}
          alt="recommend logo"
          width={300}
          style={{ marginTop: "-25px" }}
        />
      </div>

      <div>
        {catId ? (
          <div id="bookByCategoryHead">
            <img src={categoryImg[catId.toLowerCase()]} alt={catId} />
            <p>{catId[0].toUpperCase() + catId.substring(1)}</p>
          </div>
        ) : (
          <h2>Select any category to browse books</h2>
        )}

        <div id="bookByCategory">
          {category?.map((id) => {
            let bName = books[id]?.name;
            if (bName?.length > 21) {
              bName = bName.substring(0, 20) + "...";
            }

            return (
              <NavLink to={`/book/${id}`} className="bookOverview">
                <img src={books[id]?.bookFront} alt="book" />
                <h2>{bName}</h2>
                <button>₹{books[id]?.price}</button>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Category;
