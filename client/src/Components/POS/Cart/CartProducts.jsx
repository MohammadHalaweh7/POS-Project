
import style from './Cart.module.css'
import CartProduct from './CartProduct'
export default function CartProducts() {
  return (
    <div className={`${style.CartProducts}`}>
        <CartProduct />
    </div>
  )
}
