import { useRouter } from "next/router";

export function Labels() {
    let labels;
    const router = useRouter()
    const { locale } = router;
    if (locale === "en") {

        labels = {

            //Social

            "Reported successfully": "Reported successfully",
            "Post deleted successfully": "Post deleted successfully",
            "Post shared successfully": "Post shared successfully",
            "Comment deleted successfully": "Comment deleted successfully",
            "Followed successfully": "Followed successfully",
            "Unfollowed successfully": "Unfollowed successfully",
            "Requested successfully": "Requested successfully",
            "Remove user": "Remove user successfully",
            "Email address does not exist": "User with this email address does not exist",
            "New OTP has send": "New OTP has been sent to your email address",
            "Otp is invalid": "Otp is invalid",
            "Otp verification is complete": "Otp verification is complete",
            "Password Changed Successfully": "Password Changed Successfully",
            "Current password is incorrect": "Current password is incorrect",
            "Accepted successfully": "Accepted successfully",
            "Blocked user successfully": "Blocked user successfully",
            "Unblocked user successfully": "Unblocked user successfully",
            "Share post user": "Post shared successfully,chat feature will be available soon",
            "User already selected": "User already selected",

            //chat

            "Left group": "You left the group",
            "Add members": " The user has been successfully added to the group",
            "Remove members": " The user has been successfully Remove from the group",

            //Store Messages

            "Added to cart": "Item added to cart",
            "Not enough stock": "There is not enough stock",
            "Order successfull": "Order placed successfully",
            "Cart empty": "Cart is empty,please add some items",
            "Item removed from cart successfully": "Item removed from cart successfully",
            "Product shared": "Product shared successfully",
            "Store shared": "Store shared successfully",
            "Support added": "Support added successfully",

            //shop

            'This feature will added soon': 'This feature will added soon',
            'Offers added successfully': 'Offers added successfully',
            'Offer deleted successfully': 'Offer deleted successfully',
            'Offer edited successfully': 'Offer edited successfully',
            'Banner added successfully': 'Banner added successfully',
            'Banner deleted successfully': 'Banner deleted successfully',
            'Banner edited successfully': 'Banner edited successfully',
            'Requested successfully': 'Requested successfully',
            'Store edited successfully': 'Store edited successfully',




            //Play Ground 
            "PlayGround added": "Play ground added successfully",
            "PlayGround edited": "Play ground edited successfully",
            "Checkout Successfully": "Checkout Successfully",
            "Booking Cancelled": "Booking Cancelled successfully",
            "Slot Added": "Slot Added successfully",
            "Book one stadium": "At a time can only book one stadium",
            "Game created": "Game created successfully",
            "Slot removed from cart successfully": "Item removed from cart successfully",
            "Joined game": "Joined game successfully",
            "Left game": "Left game successfully",
            "PlayGround shared": "PlayGround shared successfully",
            "Invited Successfully": "Invited Successfully",
            "Field request": "Field requested successfully",



            //Tournament

            'Tournaments not found': 'Tournaments not found.....',
            'Team created': 'Team created successfully',
            'Team deleted': 'Team removed successfully',
            'Team Exist': 'User already has a team in the tournament',
            'Tournament maximum participants': 'Tournament has reached maximum participants',
            'Match updated successfully': 'Match updated successfully',
            'Match updated successfully': 'Match updated successfully',
            'Maximum participants no match': 'Number of teams does not match the maximum participants allowed',
            'Match generated': 'Match generated successfully',
            'Match details created': 'Match details created successfully',
            'Match draw created': 'Match draw created successfully',

        }
    }
    if (locale === "ar") {

        labels = {

            //Social

            "Reported successfully": "تم الإبلاغ بنجاح",
            "Post deleted successfully": "تم حذف المشاركة بنجا",
            "Post shared successfully": "تم نشر المشاركة بنجاح",
            "Comment deleted successfully": "تم حذف التعليق بنجاح",
            "Followed successfully": "اتبعت بنجاح",
            "Unfollowed successfully": "تم إلغاء المتابعة بنجاح",
            "Requested successfully": "تم الطلب بنجاح",
            "Remove user": "إزالة المستخدم بنجاح",
            "Email address does not exist": "المستخدم بعنوان البريد الإلكتروني هذا غير موجود",
            "New OTP has send": "تم إرسال OTP الجديد إلى عنوان بريدك الإلكتروني",
            "Otp is invalid": "OTP غير صالح",
            "Otp verification is complete": "اكتمال التحقق من Otp",
            "Password Changed Successfully": "تم تغيير الرقم السري بنجاح",
            "Current password is incorrect": "كلمة المرور الحالية غير صحيحة",
            "Accepted successfully": "تم القبول بنجاح",
            "Blocked user successfully": "مستخدم محظور بنجاح",
            "Unblocked user successfully": "تم إلغاء حظر المستخدم بنجاح",
            "Share post user": "تم نشر المشاركة بنجاح ، ستتوفر ميزة الدردشة قريبًا",
            "User already selected": "تم تحديد المستخدم بالفعل",

            //chat

            "Left group": "لقد غادرت المجموعة",
            "Add members": "تمت إضافة المستخدم بنجاح إلى المجموعة",
            "Remove members": "تم إزالة المستخدم بنجاح من المجموعة",

            //Store Messages

            "Added to cart": "تمت إضافة العنصر إلى سلة التسوق",
            "Not enough stock": "لا يوجد مخزون كاف",
            "Order successfull": "تم تقديم الطلب بنجاح",
            "Cart empty": "عربة التسوق فارغة ، الرجاء إضافة بعض العناصر",
            "Item removed from cart successfully": "تمت إزالة العنصر من سلة التسوق بنجاح",
            "Product shared": "تمت مشاركة المنتج بنجاح",
            "Store shared": "تم مشاركة المتجر بنجاح",
            "Support added": "تمت إضافة الدعم بنجاح",

            //shop

            'This feature will added soon': 'ستتم إضافة هذه الميزة قريبًا',
            'Offers added successfully': 'تمت إضافة العروض بنجاح',
            'Offer deleted successfully': 'تم حذف العرض بنجاح',
            'Offer edited successfully': 'تم تحرير العرض بنجاح',
            'Banner added successfully': 'تمت إضافة البانر بنجاح',
            'Banner deleted successfully': 'تم حذف البانر بنجاح',
            'Banner edited successfully': 'تم تحرير البانر بنجاح',
            'Requested successfully': 'تم الطلب بنجاح',
            'Store edited successfully': 'تم تحرير المتجر بنجاح',




            //Play Ground 
            "PlayGround added": "تمت إضافة ساحة اللعب بنجاح",
            "PlayGround edited": "تم تحرير ساحة اللعب بنجاح",
            "Checkout Successfully": "تم الدفع بنجاح",
            "Booking Cancelled": "تم إلغاء الحجز بنجاح",
            "Slot Added": "تمت إضافة الفتحة بنجاح",
            "Book one stadium": "في كل مرة يمكن حجز ملعب واحد فقط",
            "Game created": "تم إنشاء اللعبة بنجاح",
            "Slot removed from cart successfully": "تمت إزالة العنصر من سلة التسوق بنجاح",
            "Joined game": "انضم إلى اللعبة بنجاح",
            "Left game": "تركت اللعبة بنجاح",
            "PlayGround shared": "تمت مشاركة الملعب بنجاح ",
            "Invited Successfully": "تمت الدعوة بنجاح",
            "Field request": "تم طلب الحقل بنجاح",



            //Tournament

            'Tournaments not found': 'البطولات غير موجودة ....',
            'Team created': 'تم إنشاء الفريق بنجاح',
            'Team deleted': 'تم حذف الفريق بنجاح',
            'Team Exist': 'المستخدم لديه بالفعل فريق في البطولة',
            'Tournament maximum participants': 'وصلت البطولة إلى أقصى عدد من المشاركين',
            'Match updated successfully': 'تم تحديث المباراة بنجاح',
            'Maximum participants no match': 'عدد الفرق لا يتطابق مع الحد الأقصى المسموح به للمشاركين',
            'Match generated': 'تم إنشاء المباراة بنجاح',
            'Match details created': 'تم إنشاء تفاصيل المباراة بنجاح',
            'Match draw created': 'تم إنشاء قرعة المباراة بنجاح',

        }
    }

    return labels

}