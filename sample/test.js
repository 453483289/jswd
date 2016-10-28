/*
UTF8占位
lib - test.js

function ( __MODULE__ , exports  , require , __FILE__  )
*/

// Role Check
var base = require("base");
if ( !base.FlagOn( base.GetRole() ,  base.JSRT_WINDBG ) )
{
	base.printf('[-] Not In Windbg Mode!\n');
	return 0;
}

var win32 = require("windows");
var windbg = require("windbg");

var assert = base.assert;
var isArray = base.isArray;
var isString = base.isString;
var isFunction = base.isFunction;
var isNumber = base.isNumber;
var isObject = base.isObject;
var isNull = base.isNull;
var isNullOrUndefined = base.isNullOrUndefined;
var isUndefined = base.isUndefined;
var isPointer = base.isPointer;
var Pointer = base.Pointer;
var LargeInteger2Pointer = base.LargeInteger2Pointer;

var isx64 = base.isx64;
var FlagOn = base.FlagOn;
var POINTER_SIZE = base.POINTER_SIZE;


var printf = base.printf;
var KdPrint = base.KdPrint;
var sprintf = base.sprintf;

var setchar = base.setchar;
var setuchar = base.setuchar;
var setushort = base.setushort;
var setint = base.setint;
var setuint = base.setuint;
var setlong = base.setlong;
var setulong = base.setulong;
var setpointer = base.setpointer;
var setstring = base.setstring;

var getchar = base.getchar;
var getuchar = base.getuchar;
var getushort = base.getushort;
var getint = base.getint;
var getuint = base.getuint;
var getlong = base.getlong;
var getulong = base.getulong;
var getpointer = base.getpointer;
var getstring = base.getstring;

var cast2Boolean = base.cast2Boolean;
var cast2CHAR = base.cast2CHAR;
var cast2UCHAR = base.cast2UCHAR;
var cast2SHORT = base.cast2SHORT;
var cast2USHORT = base.cast2USHORT;
var cast2INT = base.cast2INT;
var cast2UINT = base.cast2UINT;
var cast2LONG = base.cast2LONG;
var cast2ULONG = base.cast2ULONG;
var cast2Pointer = base.cast2Pointer;
var cast2float = base.cast2float;
var cast2double = base.cast2double;

// ------------------------------------------------------

// win32

const OS_UNKNOWN = win32.OS_UNKNOWN;

const OS_XP_SP0 = win32.OS_XP_SP0;		// 5.1	
const OS_XP_SP1 = win32.OS_XP_SP1;
const OS_XP_SP2 = win32.OS_XP_SP2;
const OS_XP_SP3 = win32.OS_XP_SP3;

const OS_2003_SP0 = win32.OS_2003_SP0;	// 5.2
const OS_2003_SP1 = win32.OS_2003_SP1;
const OS_2003_SP2 = win32.OS_2003_SP2;

const OS_VISTA_SP0 = win32.OS_VISTA_SP0;	// 6.0
const OS_VISTA_SP1 = win32.OS_VISTA_SP1;
const OS_VISTA_SP2 = win32.OS_VISTA_SP2;

const OS_2008_SP1 = win32.OS_2008_SP1;
const OS_2008_SP2 = win32.OS_2008_SP2;

const OS_2008_R2_SP0 = win32.OS_2008_R2_SP0; // 6.1
const OS_2008_R2_SP1 = win32.OS_2008_R2_SP1; 

const OS_7_SP0 = win32.OS_7_SP0;
const OS_7_SP1 = win32.OS_7_SP1;

const OS_2012 = win32.OS_2012;	// 6.2
const OS_8 = win32.OS_8;

const OS_2012_R2 = win32.OS_2012_R2;	 // 6.3
const OS_8DOT1 = win32.OS_8DOT1;

const OS_2016 = win32.OS_2016;	// 10.0

const OS_10TH1 = win32.OS_10TH1;
const OS_10TH2 = win32.OS_10TH2;
const OS_10RS1 = win32.OS_10RS1;

const OS_MAX = win32.OS_MAX;

//----------------------------------------------------
// windbg
var ReadVirtualChar = windbg.ReadVirtualChar;
var ReadVirtualUChar = windbg.ReadVirtualUChar;
var ReadVirtualShort = windbg.ReadVirtualShort;
var ReadVirtualUShort = windbg.ReadVirtualUShort;
var ReadVirtualInt = windbg.ReadVirtualInt;
var ReadVirtualUInt = windbg.ReadVirtualUInt;
var ReadVirtualLong = windbg.ReadVirtualLong;
var ReadVirtualULong = windbg.ReadVirtualULong;
var ReadVirtualPointer = windbg.ReadVirtualPointer;
var ReadVirtualFloat = windbg.ReadVirtualFloat;
var ReadVirtualDouble = windbg.ReadVirtualDouble;
var ReadVirtualStringA = windbg.ReadVirtualStringA;
var ReadVirtualStringW = windbg.ReadVirtualStringW;

var WriteVirtualChar = windbg.WriteVirtualChar;
var WriteVirtualUChar = windbg.WriteVirtualUChar;
var WriteVirtualShort = windbg.WriteVirtualShort;
var WriteVirtualUShort = windbg.WriteVirtualUShort;
var WriteVirtualInt = windbg.WriteVirtualInt;
var WriteVirtualUInt = windbg.WriteVirtualUInt
var WriteVirtualLong = windbg.WriteVirtualLong;
var WriteVirtualULong = windbg.WriteVirtualULong;
var WriteVirtualPointer = windbg.WriteVirtualPointer;
var WriteVirtualFloat = windbg.WriteVirtualFloat;
var WriteVirtualDouble = windbg.WriteVirtualDouble;
var WriteVirtualStringA = windbg.WriteVirtualStringA;
var WriteVirtualStringW = windbg.WriteVirtualStringW;

var GetRegChar = windbg.GetRegChar;
var GetRegUChar = windbg.GetRegUChar;
var GetRegShort = windbg.GetRegShort;
var GetRegUShort = windbg.GetRegUShort;
var GetRegInt = windbg.GetRegInt;
var GetRegUInt = windbg.GetRegUInt;
var GetRegLong = windbg.GetRegLong;
var GetRegULong = windbg.GetRegULong;
var GetRegPointer = windbg.GetRegPointer;
var GetRegFloat = windbg.GetRegFloat;
var GetRegDouble = windbg.GetRegDouble;

var SetRegChar = windbg.SetRegChar;
var SetRegUChar = windbg.SetRegUChar;
var SetRegShort = windbg.SetRegShort;
var SetRegUShort = windbg.SetRegUShort;
var SetRegInt = windbg.SetRegInt;
var SetRegUInt = windbg.SetRegUInt;
var SetRegLong = windbg.SetRegLong;
var SetRegULong = windbg.SetRegULong;
var SetRegPointer = windbg.SetRegPointer;
var SetRegFloat = windbg.SetRegFloat;
var SetRegDouble = windbg.SetRegDouble;

var GetRegChar = windbg.GetRegChar;


var GetSymbolAddress = windbg.GetSymbolAddress;
var GetAddressSymbol = windbg.GetAddressSymbol;

var GetFieldOffset = windbg.GetFieldOffset;
var CONTAINING_RECORD = windbg.CONTAINING_RECORD;

var ReloadModule = windbg.ReloadModule;
var GetImageBase = windbg.GetImageBase;

var ExecuteCommand = windbg.ExecuteCommand;

var GetSystemVersion = windbg.GetSystemVersion;
var IsPointer64Bit = windbg.IsPointer64Bit;

var PsGetCurrentThread = windbg.PsGetCurrentThread;
var PsGetCurrentProcess = windbg.PsGetCurrentProcess;
var PsGetThreadWin32Thread = windbg.PsGetThreadWin32Thread;
var PsGetCurrentWin32Thread = windbg.PsGetCurrentWin32Thread;
var GetImplicitProcess = windbg.GetImplicitProcess;
var SetImplicitProcess = windbg.SetImplicitProcess;
var GetImplicitThread = windbg.GetImplicitThread;
var SetImplicitThread = windbg.SetImplicitThread;

var PsGetActiveProcessList = windbg.PsGetActiveProcessList;
var PsLookupProcessByProcessImageName = windbg.PsLookupProcessByProcessImageName;

// --------------------------------------------------------------------

/*



*/





// --------------------------------------------------------------------

function Work()
{
	var ptr_gTimerId = null;
	
	do
	{
		ptr_gTimerId = GetSymbolAddress('win32kbase!gcmsLastTimer');
		
		printf("ptr_gTimerId = 0x%p    \n" , ptr_gTimerId );
		
	}while(false);
	
	return 0;
}


// tagSHAREDINFO
function main(argv)
{
	var nOSVer = 0;
	var stTargetVer = null;
	var gSharedInfo = null;	

	do
	{
		stTargetVer = GetSystemVersion();
		nOSVer = stTargetVer.OSVer;
		KdPrint("[+] Target Version is %s\n" , stTargetVer.strOSVer );
		
		KdPrint("[+] try load win32k.sys\n");
		ReloadModule("win32k.sys");
		if ( nOSVer > OS_10TH1 )
		{
			KdPrint("[+] try load win32kbase.sys\n");
			ReloadModule("win32kbase.sys");
			
			KdPrint("[+] try load win32kfull.sys\n");
			ReloadModule("win32kfull.sys");
		}
		
		printf('  \n\n');
		Work();
		
	}while(false);
	
	return 0;
}
exports.main = main;


// --------------------------------------------------------------------