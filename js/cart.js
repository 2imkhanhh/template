document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');

    cartItems.forEach(item => {
        const qtyBtns = item.querySelectorAll('.qty-btn');
        const qtySpan = item.querySelector('.cart-item-quantity span');
        const removeBtn = item.querySelector('.cart-item-remove');

        if (qtyBtns.length === 2 && qtySpan) {
            const decreaseBtn = qtyBtns[0];
            const increaseBtn = qtyBtns[1];

            decreaseBtn.addEventListener('click', () => {
                let currentQty = parseInt(qtySpan.textContent);
                if (currentQty > 1) {
                    qtySpan.textContent = currentQty - 1;
                    updateTotals();
                }
            });

            increaseBtn.addEventListener('click', () => {
                let currentQty = parseInt(qtySpan.textContent);
                qtySpan.textContent = currentQty + 1;
                updateTotals();
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                item.style.transition = 'opacity 0.3s ease';
                item.style.opacity = '0';

                setTimeout(() => {
                    item.remove();
                    updateTotals();
                }, 300);
            });
        }
    });

    function updateTotals() {
        const items = document.querySelectorAll('.cart-item');
        let subtotal = 0;

        items.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            const qty = parseInt(item.querySelector('.cart-item-quantity span').textContent);

            if (!isNaN(price) && !isNaN(qty)) {
                subtotal += price * qty;
            }
        });

        const summaryRows = document.querySelectorAll('.ticket .summary-row:not(.discount) span:last-child');
        const discountRow = document.querySelector('.ticket .summary-row.discount span:last-child');
        const totalElement = document.querySelector('.ticket .summary-total span:last-child');
        const formatMoney = (amount) => {
            return amount.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';
        };

        if (summaryRows.length >= 2) {
            summaryRows[0].textContent = formatMoney(subtotal);
            const discount = subtotal > 0 ? 200000 : 0;
            if (discountRow) {
                discountRow.textContent = '- ' + formatMoney(discount);
            }

            const total = Math.max(0, subtotal - discount);
            if (totalElement) {
                totalElement.textContent = formatMoney(total);
            }
        }
    }

    updateTotals();
});
