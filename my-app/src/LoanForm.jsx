import Modal from "./Modal";
export default function LoanForm(){
    return(
        <div>
            <form className="LoanForm">
                <h3>نموذج ادخال بيانات القرض</h3>
                <hr />
                <div className="row">
                <label htmlFor="Name">الاسم الكامل</label>
                <input type="text"  id="Name"/>
                </div>
                <div className="row">

                <label htmlFor="age"> العمر  \ السن</label>
                <input type="number" name="" id="age" />
                </div>


                <div className="row">
                    
                <label htmlFor="phone">رقم الهاتف</label>
                <input type="number" name="" id="phone" />
                </div>

                <div className="row">
                <label htmlFor="isEmployee">هل لديك وظيفة حاليا؟</label>
                <input type="checkbox" name="" id="isEmployee"  className="checkbox"/>
                </div>

                <div className="row">
                <label htmlFor="salary">المرتب</label>
                <input type="number" name="" id="salary" />
                </div>

                <button type="submit" className="submit">إرسال البيانات</button>
            </form>

            <Modal />
        </div>
    );
}