import Link from 'next/link';

const Breadcrumb = ({ title = '' }) => (
  <section className="breadcrumb">
    <div className="container">
      <ul className="breadcrumb-list">
        <li>
          <Link href="/">
            <i className="icon-home"></i>
          </Link>
        </li>
        <li>
          <Link href="/all-products">All Products</Link>
        </li>
        <li className="text-black">{title}</li>
      </ul>
    </div>
  </section>
);

export default Breadcrumb;
